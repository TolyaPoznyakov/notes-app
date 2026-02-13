<template>
  <div>
    <div class="grid place-items-center mt-[10px]">
      <note-form />
    </div>
    <div class="grid place-items-center mt-[10px] w-full">
      <categories-tabs />
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '~/store/categories.js'

definePageMeta({
  middleware: ['auth']
})

const categoriesStore = useCategoriesStore()

onMounted(async () => {
  await categoriesStore.getAll()
})
</script>

<style scoped></style>
