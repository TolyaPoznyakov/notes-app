<template>
  <div>
    <div class="grid place-items-center mt-[10px]">
      <Card class="mb-5 w-md p-4">
        <CardHeader class="p-0">
          <CardTitle class="text-2xl font-bold">Add note</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <note-form
            :categories="categories"
            :selected-category-id="selectedCategoryId"
          />
        </CardContent>
      </Card>
    </div>
    <div class="grid place-items-center mt-[10px] w-full">
      <categories-tabs
        :categories="categories"
        @update:category-id="updateCategoryId"
        @update:categories="fetchCategories"
      />
    </div>
  </div>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import routes from '~/const/routes'

definePageMeta({
  middleware: ['auth']
})

const categories = ref([])
const selectedCategoryId = ref('all')

const fetchCategories = async () => {
  const res = await useApiRequest(routes.categories.list(), {
    key: 'categories' + new Date().getMilliseconds() // обхід useFetch кешування
  })
  categories.value = res.data.value
}

const updateCategoryId = (val) => {
  selectedCategoryId.value = val
}

onMounted(async () => {
  await fetchCategories()
})
</script>

<style scoped></style>
