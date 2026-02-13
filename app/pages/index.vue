<template>
  <div>
    <div class="grid place-items-center mt-[10px]">
      <Card class="mb-5 w-md p-4">
        <CardHeader class="p-0">
          <CardTitle class="text-2xl font-bold">Add note</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <note-form />
        </CardContent>
      </Card>
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
