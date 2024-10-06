<template>
  <div class="sm:flex justify-center gap-4 sm:py-4 py-2 sticky bg-white sm:top-[88px] top-[68px] z-40" style="">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" v-model="search" placeholder="Search..." class="pl-10 mb-1" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div>
      <Select v-model="selected" class="" >
        <SelectTrigger>
          <SelectValue placeholder="Choose location..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="location in state.locationList" :value="location.id" :key="location.id">
              {{ location.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ILocation } from '@/types'


interface IState {
  locationList: ILocation[]
  nextPage: number
}

const state = reactive<IState>({
  locationList: [],
  nextPage: 1
})

const search = ref()
const selected = ref()
const selectedLocationName = computed(() => selected.value ? state.locationList.filter(location => location.id === selected.value)[0].name  : null)

const getLocationList = async (page = state.nextPage) => {
  const url = `https://rickandmortyapi.com/api/location?page=${page}`
  const { data } = await useFetch(url).json()  
  state.nextPage = data.value.info.next ? data.value.info.next.split('=')[1] : null
  return data.value?.results  
}

const loadMore = async () => {
  if (!state.nextPage) return
  const newLocationList = await getLocationList(state.nextPage)
  state.locationList.push(...newLocationList)
}

watch(
  () => state.nextPage,
  (val) => {
    if (val !== null) loadMore()
  }
)

onMounted(async () => {
  state.locationList = await getLocationList()
})

defineExpose({
  search,
  selectedLocationName
})
</script>