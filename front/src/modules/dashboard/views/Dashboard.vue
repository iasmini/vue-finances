<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>
<script>
import AppLayout from '@/modules/dashboard/components/AppLayout'

export default {
  name: 'Dashboard',
  components: { AppLayout },
  comments: {
    AppLayout
  }
}
</script>
