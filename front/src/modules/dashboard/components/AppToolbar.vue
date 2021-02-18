<template>
  <v-toolbar
    app
    fixed
    dark
    color="primary"
  >
    <v-app-bar-nav-icon @click.stop="$emit('hideMenu', !showMenu)">
      <v-icon>menu</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title >Dashboard</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    prop: 'showMenu',
    event: 'hideMenu'
  }
}
</script>
