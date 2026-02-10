<template>
  <div>
    <div class="grid place-items-center mt-[10px]">
      <note-form :categories="categories" />
    </div>
    <div class="grid place-items-center mt-[10px] w-full">
      <categories-tabs :categories="categories" />
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '~/store/categories.js'

definePageMeta({
  middleware: ['auth']
})

const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.categories)

onMounted(async () => {
  await categoriesStore.getAll()
})
</script>

<style scoped></style>

<!--<template>-->
<!--  <div>-->
<!--    <div class="grid place-items-center mt-[10px]">-->
<!--      <note-form-->
<!--          :categories="categories"-->
<!--          :selected-category-id="selectedCategoryId"-->
<!--          @update:notes="updateNotes"-->
<!--      />-->
<!--    </div>-->
<!--    <div class="grid place-items-center mt-[10px] w-full">-->
<!--      <categories-tabs-->
<!--          :categories="categories"-->
<!--          @update:category-id="updateCategoryId"-->
<!--          @update:categories="fetchCategories"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { useApiRequest } from '~/composables/apiRequest.js'-->
<!--import routes from '~/const/routes'-->

<!--definePageMeta({-->
<!--  middleware: ['auth']-->
<!--})-->

<!--const categories = ref([])-->
<!--const selectedCategoryId = ref('all')-->

<!--const fetchCategories = async () => {-->
<!--  const res = await useApiRequest(routes.categories.list(), {-->
<!--    key: 'categories' + new Date().getMilliseconds() // обхід useFetch кешування-->
<!--  })-->
<!--  categories.value = res.data.value-->
<!--}-->

<!--const updateCategoryId = (val) => {-->
<!--  selectedCategoryId.value = val-->
<!--}-->

<!--onMounted(async () => {-->
<!--  await fetchCategories()-->
<!--})-->
<!--</script>-->

<!--<style scoped></style>-->
