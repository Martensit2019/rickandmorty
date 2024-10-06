<template>
  <div class="">
    <!-- <div v-if="notData">{{ notDataText }}</div>
    <div v-else class="grid grid-cols-4 gap-4 my-4">
      <Card v-for="breed in dataBreeds" :card="breed" />
    </div> -->
    <div ref="refList" class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-4">
        <CharacterCard v-for="card in list" :card="card" />
      </div>
  </div>
</template>

<script setup lang="ts">
import {ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import type { ICharactersCard } from '@/types'

interface IProps {
  list: ICharactersCard[]
}
defineProps<IProps>()

const refList = ref()

defineExpose({
  refList
})


</script>
