<template>
  <v-list two-line>
    <EntriesListItem v-for="entry in entries" :key="entry.id" :entry="entry" />
  </v-list>
</template>
<script>
import EntriesListItem from './EntriesListItem'
import EntriesService from '../services/entries-service'

export default {
  name: 'EntriesList',
  components: {
    EntriesListItem
  },
  data: () => ({
    entries: []
  }),
  async created() {
    this.entries = await EntriesService.entries()
  }
}
</script>
