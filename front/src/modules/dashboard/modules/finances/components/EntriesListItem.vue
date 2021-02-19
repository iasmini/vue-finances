<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon :color="entryIconColor(entry.kind)" :class="['lighten-1 white--text']">{{ entryIcon(entry.kind) }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ entry.description }}</v-list-item-title>
      <v-list-item-subtitle>{{ entry.category.name }} | {{ entry.account.name }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <span :class="amountColor(entry.kind)">{{ formatCurrency(entry.amount) }}</span>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import formatCurrencyMixin from '@/mixins/format-currency'

export default {
  name: 'EntriesListItem',
  mixins: [formatCurrencyMixin],
  props: {
    entry: Object
  },
  methods: {
    amountColor (kind) {
      return kind === 'CREDIT' ? 'primary--text text-lighten-1' : 'error--text text-lighten-1'
    },
    entryIcon (kind) {
      return kind === 'CREDIT' ? 'arrow_circle_up' : 'arrow_circle_down'
    },
    entryIconColor (kind) {
      return kind === 'CREDIT' ? 'primary' : 'error'
    }
  }
}
</script>
