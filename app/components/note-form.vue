<template>
  <Card class="mb-5 w-md p-4">
    <Input v-model="form.title" placeholder="Title" />
    <Textarea v-model="form.text" placeholder="Text" />
    <CategoryAutocomplete
      v-model="form.categoryId"
      :categories="categories"
    />
    <Button
      class="w-30 cursor-pointer hover:scale-103"
      variant="outline"
      :disabled="loading"
      @click="createNote"
    >
      Add note
    </Button>
  </Card>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Card } from '~/components/ui/card'
import { toast } from 'vue-sonner'
import { useNotesStore } from '~/store/notes'

const notesStore = useNotesStore()

const props = defineProps({
  selectedCategoryId: {
    type: String,
    default: 'all'
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const loading = ref(false)
// local state
const form = reactive({
  title: '',
  text: '',
  categoryId: props.selectedCategoryId !== 'all' ? props.selectedCategoryId : null
})

const createNote = async () => {
  if (!form.title.trim() && !form.text.trim()) {
    toast.error('Please enter a title, text and select categories.')
    return
  }
  if (!form.title.trim()) {
    toast.error('Please enter a title.')
    return
  }
  loading.value = true

  try {
    const payload = {
      title: form.title,
      text: form.text,
      categoryId: form.categoryId || null
    }
    await notesStore.create(payload)
    toast.success('Note has been created')
    resetForm()
  } catch (error) {
    toast.error('Failed to create note')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.title = ''
  form.text = ''
  form.categoryId = ''
}
</script>
