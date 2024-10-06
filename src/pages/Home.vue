<template>
  <div>
    <ControlsBlock ref="refControlsBlock" />
    <div v-if="!filteredCharacterList.length">There is nothing here. Try again.</div>
    <CharacterList v-else ref="refCharacterList" :list="filteredCharacterList" />
  </div>
</template>

<script setup lang="ts">
import { useFetch, useDebounceFn } from '@vueuse/core'
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import ControlsBlock from '@/components/ControlsBlock.vue'
import CharacterList from '@/components/CharacterList.vue'
import type { ICharactersCard } from '@/types'

interface IState {
  charactersList: ICharactersCard[]
  isLoad: boolean
  nextPage: number
}

const state = reactive<IState>({
  charactersList: [],
  isLoad: false,
  nextPage: 1
})

const refControlsBlock = ref()
const refCharacterList = ref()

const search = computed(() => refControlsBlock.value?.search || '')
const selectedLocationName = computed(() => refControlsBlock.value?.selectedLocationName || null)
const refScrolled = computed(() => refCharacterList.value.refList)

const filteredCharacterList = computed(() => {
  if (!selectedLocationName.value) return state.charactersList
  return state.charactersList.filter((character) => character.origin.name === selectedLocationName.value || character.location.name === selectedLocationName.value)
})

const getCharacterList = async (page = state.nextPage) => {
  const url = `https://rickandmortyapi.com/api/character?name=${search.value}&page=${page}`
  const { isFetching, error, data } = await useFetch(url).json()
  state.nextPage = data.value?.info?.next ? data.value.info.next.split('=')[1] : null
  state.isLoad = isFetching.value
  return !error.value ? data.value?.results : []
}

const loadMore = async () => {
  if (!state.nextPage) return
  const newCharacterList = await getCharacterList(state.nextPage)
  state.charactersList.push(...newCharacterList)
  await nextTick()
}

const handleScroll = () => {
  if (refScrolled.value.getBoundingClientRect().bottom < window.innerHeight + 51) loadMore()
}

const debouncedFn = useDebounceFn(async () => {
  state.charactersList = await getCharacterList(1)
  nextTick()
}, 1000)

watch(
  () => search.value,
  () => debouncedFn()
)

onMounted(async () => {
  state.charactersList = await getCharacterList()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>
