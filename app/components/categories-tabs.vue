<template>
  <Tabs v-model="selectedCategoryId" default-value="all" class="grid place-items-center w-full">
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger
        v-for="category in categories"
        :key="category._id"
        :value="category._id"
        class="group"
      >
        {{ category.name }}
        <Button
          variant="ghost"
          class="w-0 h-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          @click="deleteCategory(category._id)"
        >
          <X />
        </Button>
      </TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <div class="flex flex-wrap">
        <note-card v-for="note in notes" :key="note._id" :note="note" />
      </div>
    </TabsContent>
    <TabsContent v-for="category in categories" :key="category._id" :value="category._id">
      <template v-if="!notes.length">
        <div class="grid place-items-center w-full">
          <h2 class="text-2xl font-bold pt-10">No notes found in this category</h2>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-wrap">
          <note-card v-for="note in notes" :key="note._id" :note="note" />
        </div>
      </template>
    </TabsContent>
  </Tabs>
</template>

<script setup>
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useNotesStore } from '~/store/notes'
import { useCategoriesStore } from '~/store/categories.js'
import { useDialogsStore } from '~/store/dialogs'
import { storeToRefs } from 'pinia'

const dialogsStore = useDialogsStore()
const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()

const { categories, selectedCategoryId } = storeToRefs(categoriesStore)

const loading = ref(false)

const notes = computed(() => notesStore.notes)

watch(selectedCategoryId, async (val) => {
  if (val === 'all') {
    await fetchNotes(null)
    return
  }
  await fetchNotes(val)
})

onMounted(async () => {
  await fetchNotes(null)
})

const fetchNotes = async (categoryId) => {
  loading.value = true
  await notesStore.getAll(categoryId)
  loading.value = false
}

const deleteCategory = (categoryId) => {
  dialogsStore.open('confirm', {
    title: 'Are you sure you want to delete this category?',
    description: 'This action is irreversible, be careful.',
    onSubmit: async () => {
      await categoriesStore.delete(categoryId)
      toast.success('Category has been deleted')
    }
  })
}
</script>
