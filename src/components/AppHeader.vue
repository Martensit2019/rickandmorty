<template>
  <header
    class="fixed top-0 right-0 left-0 bg-slate-800 text-white sm:text-4xl sm:py-6 text-3xl py-4 font-semibold text-center z-50">
    <div class="container mx-auto">
      <div class="flex w-full justify-between">
        <RouterLink to="/">
          <h1>Rick and Morty</h1>
        </RouterLink>
        <RouterLink to="/favorite">
          <div class="relative">
            <Heart class="sm:size-10 size-8 text-yellow-500 hover:cursor-pointer" :fill="colorIcon"
              @click="dogStore.addToFavorite(card.id)" />
            <div v-if="dogStore.favoritesCount"
              class="absolute -top-2 -right-2 rounded-full bg-slate-400 w-5 h-5 flex justify-center text-xs text-white font-bold">
              {{ dogStore.favoritesCount }}
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'

const dogStore = useFavoriteStore()
const colorIcon = computed(() => dogStore.favorites.length ? 'rgb(234 179 8)' : 'transparent')
</script>