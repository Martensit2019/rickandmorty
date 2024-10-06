import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<string[]>([])
  const favoritesCount = computed(() => favorites.value.length)
  const addToFavorite = (strImg: string) => {
    if (favorites.value.includes(strImg)) {
      favorites.value = favorites.value.filter((str) => str !== strImg)
    } else {
      favorites.value.push(strImg)
    }
  }

  watch(
    () => favoritesCount.value,
    (val) => {
      val ? localStorage.setItem('favorites', JSON.stringify(favorites.value)) : localStorage.removeItem('favorites')
    }
  )

  return { favorites, favoritesCount, addToFavorite }
})