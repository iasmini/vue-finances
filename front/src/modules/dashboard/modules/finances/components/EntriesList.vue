<template>
  <div>
    <ToolbarByMonth />
    <v-card>
      <v-list two-line subheader>
        <template v-for="(groupedEntries, dueDateKey, index) in mappedEntries">
          <v-subheader :key="dueDateKey">{{ dueDateKey }}</v-subheader>
          <EntriesListItem v-for="entry in groupedEntries" :key="entry.id" :entry="entry"/>
          <v-divider
            :key="`${dueDateKey}-${index}`"
            v-if="showDivider(index, mappedEntries)"
          ></v-divider>
        </template>
      </v-list>
      <v-footer class="pa-2">
        <v-flex offset-xs9>
          <h3 class="font-weight-light text-right">
            <span>Saldo do mês:</span>
            <strong :class="[amountColor(totalAmount), 'ml-16']">{{ formatCurrency(totalAmount) }}</strong>
          </h3>
        </v-flex>
      </v-footer>
    </v-card>
  </div>
</template>
<script>
import moment from 'moment'

import EntriesListItem from './EntriesListItem'
import EntriesService from '../services/entries-service'
import ToolbarByMonth from './ToolbarByMonth'
import formatCurrency from '@/mixins/format-currency'
import { groupBy } from '@/utils'

export default {
  name: 'EntriesList',
  components: {
    EntriesListItem,
    ToolbarByMonth
  },
  data: () => ({
    entries: []
  }),
  computed: {
    mappedEntries () {
      return groupBy(this.entries, 'due_date', (entry, dueDateKey) => {
        return moment(entry[dueDateKey]).format('DD/MM/YYYY')
      })
    },
    totalAmount () {
      return this.entries.reduce((summary, entry) => entry.kind === 'CREDIT' ? summary + entry.amount : summary - entry.amount, 0)
    }
  },
  methods: {
    amountColor (amount) {
      return amount < 0 ? 'error--text text-lighten-1' : 'primary--text text-lighten-1'
    },
    showDivider (index, object) {
      // funcao para esconder o ultimo divider da lista
      return index < Object.keys(object).length - 1
    }
  },
  mixins: [
    formatCurrency
  ],
  async created () {
    this.entries = await EntriesService.entries()
  }
}
</script>
