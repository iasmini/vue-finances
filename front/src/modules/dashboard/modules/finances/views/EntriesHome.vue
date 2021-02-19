<template>
  <div>
    <h1>Lançamentos</h1>
    <EntriesList />
  </div>
</template>
<script>
import EntriesList from '../components/EntriesList'

export default {
  name: 'EntriesHome',
  components: {
    EntriesList
  }
}
</script>
