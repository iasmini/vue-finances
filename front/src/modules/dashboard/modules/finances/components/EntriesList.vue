<template>
  <v-list two-line subheader>
    <template v-for="(groupedEntries, dueDateKey, index) in mappedEntries">
      <v-subheader :key="dueDateKey">{{ dueDateKey }}</v-subheader>
      <EntriesListItem v-for="entry in groupedEntries" :key="entry.id" :entry="entry" />
      <v-divider
        :key="`${dueDateKey}-${index}`"
        v-if="showDivider(index, mappedEntries)"
      ></v-divider>
    </template>
  </v-list>
</template>
<script>
import moment from 'moment'

import EntriesListItem from './EntriesListItem'
import EntriesService from '../services/entries-service'
import { groupBy } from '@/utils'

export default {
  name: 'EntriesList',
  components: {
    EntriesListItem
  },
  data: () => ({
    entries: []
  }),
  computed: {
    mappedEntries () {
      return groupBy(this.entries, 'due_date', (entry, dueDateKey) => {
        return moment(entry[dueDateKey]).format('DD/MM/YYYY')
      })
    }
  },
  methods: {
    showDivider (index, object) {
      // funcao para esconder o ultimo divider da lista
      return index < Object.keys(object).length - 1
    }
  },
  async created () {
    this.entries = await EntriesService.entries()
  }
}
</script>
