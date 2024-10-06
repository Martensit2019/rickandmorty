<template>
  <div v-if="!filteredCharacterList.length">Favorites is empty.</div>
  <CharacterList v-else ref="refCharacterList" :list="filteredCharacterList" />
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import CharacterList from '@/components/CharacterList.vue'
import { useFetch } from '@vueuse/core'
import { useFavoriteStore } from '@/stores/favorite'
import type { ICharactersCard } from '@/types'

interface IState {
  charactersList: ICharactersCard[]
}

const dogStore = useFavoriteStore()

const state = reactive<IState>({
  charactersList: [],
})

const listFavorites = computed(() => dogStore.favorites.join(','))

const filteredCharacterList = computed(() => listFavorites.value.length ? state.charactersList.filter(it => listFavorites.value.includes(it.id as unknown as string)) : [])

const getCharacterList = async () => {
  if (!listFavorites.value) return
  const url = `https://rickandmortyapi.com/api/character/${listFavorites.value}`
  const { error, data } = await useFetch(url).json()
  return !error.value ? listFavorites.value.length === 1 ? state.charactersList.push(data.value) : data.value : []
}

onMounted(async () => {
  state.charactersList = await getCharacterList()
})
</script>

<style scoped></style>
