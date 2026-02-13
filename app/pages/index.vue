<template>
  <div>
    <div class="grid place-items-center mt-[10px]">
      <note-form :categories="categories" :selected-category-id="selectedCategoryId" />
    </div>
    <div class="grid place-items-center mt-[10px] w-full">
      <categories-tabs :categories="categories" @update:category-id="updateCategoryId" />
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '~/store/categories.js'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth']
})

const categoriesStore = useCategoriesStore()
const { categories, selectedCategoryId } = storeToRefs(categoriesStore)

const updateCategoryId = (val) => {
  categoriesStore.setSelectedCategoryId(val)
}

onMounted(async () => {
  await categoriesStore.getAll()
})
</script>

<style scoped></style>
