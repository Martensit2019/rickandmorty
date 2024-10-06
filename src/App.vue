<template>
   <DefaultLayout>
      <router-view />
   </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useFavoriteStore } from '@/stores/favorite';
const dogStore = useFavoriteStore()

const getFavotites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') as string)
  if(favorites) dogStore.favorites = [...favorites]
}
getFavotites()

</script>
