<template>
  <div class="p-1 mb-2 border rounded-sm sm:hover:-translate-y-1 sm:hover:shadow-xl">
    <div class="flex h-60 overflow-hidden">
      <img class="object-cover w-full hover:scale-125" :src="card.image" />
    </div>
    <div class="p-2">
      <div class="flex justify-between">
        <h2 class="font-bold text-xl">{{ card.name }}</h2>
        <div style="">
          <Heart class="size-8 text-yellow-500 hover:cursor-pointer" :fill="colorIcon" @click="dogStore.addToFavorite(card.id as unknown as string)" />
        </div>
      </div>
      <div class="flex items-center capitalize">
        <span :class="['w-2 h-2 rounded-full mr-1', card.status === 'Dead' ? 'bg-red-600' : 'bg-green-400']"></span>
        {{ card.status }} - {{ card.species }}
      </div>
      <div><span class="font-medium">Gender:</span> {{ card.gender }}</div>
      <div class="text-sm mt-2 text-slate-400">Last known location:</div>
      <div>{{ card.location.name }}</div>
      <div class="text-sm mt-2 text-slate-400">First seen in:</div>
      <div>Ricksy Business</div>
    </div>
    <router-link class=" text-yellow-500 cursor-pointer hover:text-bold" :to="`/character/${card.id}`">GO TO MORE >>></router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import type { ICharactersCard } from '@/types'

const dogStore = useFavoriteStore()

interface IProps {
  card: ICharactersCard
}
const props = defineProps<IProps>()

const colorIcon = computed(() => dogStore.favorites.includes(props.card.id as unknown as string) ? 'rgb(234 179 8)' : 'transparent')

</script>

<style>
.character-card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  transition: transform 0.3s ease;
}
</style>