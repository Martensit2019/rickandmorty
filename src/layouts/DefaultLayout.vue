<template>
  <div class="default_layout flex flex-col h-dvh">
    <AppHeader />
    <main class="flex-auto container sm:pt-28 pt-24">
      <slot />
    </main>
     <AppFooter />
  </div>

</template>
<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>


<style scoped>
</style>