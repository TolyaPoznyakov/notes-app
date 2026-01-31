<template>
  <Tabs v-model="activeCategoryId" default-value="all" class="grid place-items-center w-full">
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger
        v-for="category in categories"
        :key="category._id"
        :value="category._id"
        class="group"
      >
        {{ category.name }}
        <confirm-delete-dialog
          entity="category"
          class="flex items-center"
          @confirm="deleteCategory(category._id)"
        >
          <Button
            variant="ghost"
            class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X />
          </Button>
        </confirm-delete-dialog>
      </TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <div class="flex flex-wrap">
        <note-card
          v-for="note in notes"
          :key="note._id"
          :note="note"
          @edit="editNote"
          @delete="deleteNote(note._id)"
        />
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
          <note-card
            v-for="note in notes"
            :key="note._id"
            :note="note"
            @edit="editNote"
            @delete="deleteNote(note._id)"
          />
        </div>
      </template>
    </TabsContent>
  </Tabs>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import routes from '~/const/routes'
import { X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useNotesStore } from '~/store/notes'

const notesStore = useNotesStore()

defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:categoryId', 'update:categories'])

const activeCategoryId = ref('all')
const loading = ref(false)

const notes = computed(() => notesStore.notes)

watch(activeCategoryId, async (val) => {
  emit('update:categoryId', val)
  if (val === 'all') {
    await fetchNotes(null)
    return
  }
  await fetchNotes(activeCategoryId.value)
})

onMounted(async () => {
  await fetchNotes(null)
})

const fetchNotes = async (categoryId) => {
  loading.value = true
  await notesStore.getAll(categoryId)
  loading.value = false
}

const editNote = async (updateNote) => {
  await notesStore.update(updateNote._id, updateNote)
  toast.success('Note updated')
}

const deleteNote = async (noteId) => {
  await notesStore.delete(noteId)
  toast.success('Note has been deleted')
}

const deleteCategory = async (categoryId) => {
  await useApiRequest(routes.categories.concrete(categoryId), {
    method: 'DELETE'
  })
  emit('update:categories')
  toast.success('Category has been deleted with its notes')
}
</script>
