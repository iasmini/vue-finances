<template>
  <v-toolbar color="primary" dark>
    <v-layout align-center>
      <v-flex xs1>
        <div>
          <v-btn icon @click="decrement">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-toolbar-title class="text-center">
          <span>{{ currentMonth }}</span>
        </v-toolbar-title>
      </v-flex>
      <v-flex xs1>
        <div>
          <v-btn icon @click="increment">
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  data: () => ({
    dueDate: moment()
  }),
  props: {
    format: String
  },
  computed: {
    currentMonth () {
      return this.dueDate.format('MMMM YYYY')
    }
  },
  methods: {
    emit () {
      this.$emit('monthChanged', this.dueDate.format(this.format))
    },
    decrement () {
      this.dueDate = this.dueDate.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.dueDate = this.dueDate.clone().add(1, 'month')
      this.emit()
    }
  },
  created () {
    this.emit()
  }
}
</script>
