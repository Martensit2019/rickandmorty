<template>
<div class="p-1 mb-2 border rounded-sm ">
    <div class="flex h-60 overflow-hidden">
      <img class="object-cover  " :src="data.image" />
    </div>
    <div class="p-2">
      <div class="flex justify-between">
        <h2 class="font-bold text-xl">{{ data.name }}</h2>
        <Heart class="size-8 text-yellow-500 hover:cursor-pointer" :fill="colorIcon" @click="dogStore.addToFavorite(data.id)" />
      </div>
      <div class="flex items-center capitalize">
        <span :class="['w-2 h-2 rounded-full mr-1', data.status === 'Dead' ? 'bg-red-600' : 'bg-green-400']"></span>
        {{ data.status }} - {{ data.species }}
      </div>
      <div><span class="font-medium">Gender:</span> {{ data.gender }}</div>
      <div class="text-sm mt-2 text-slate-400">Last known location:</div>
      <div>{{ data.location.name }}</div>
      <div class="text-sm mt-2 text-slate-400">First seen in:</div>
      <div>Ricksy Business</div>
    </div>
    <router-link class=" text-yellow-500 cursor-pointer hover:text-bold" to="/">RETURN TO ALL CHARACTERS >>></router-link>
  </div>
</template>



<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'

const { params } = useRoute()

const dogStore = useFavoriteStore()

const url = computed(() => `https://rickandmortyapi.com/api/character/${params.id}`)

const { data } = useFetch(url, { refetch: true }).json()

const colorIcon = computed(() => dogStore.favorites.includes(data.value.id) ? 'rgb(234 179 8)' : 'transparent')





// const dataBreeds = computed(() => data.value && createBreedsData(data.value.message))
</script>

<style scoped></style>