<template>
  <Card class="mb-5 w-md p-4">
    <Input v-model="form.title" placeholder="Title" />
    <Textarea v-model="form.text" placeholder="Text" />
    <CategoryAutocomplete v-model="form.categoryId" :categories="categories" />
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
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest.js'

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

const emit = defineEmits(['update:notes'])

const loading = ref(false)
const form = reactive({
  title: '',
  text: '',
  categoryId: props.selectedCategoryId !== 'all' ? props.selectedCategoryId : null
})

// todo: reuse
const fetchNotes = async () => {
  const res = await useApiRequest(routes.notes.list(), {
    key: 'notes' + new Date().getMilliseconds(), // обхід useFetch кешування
    query: {
      categoryId: props.selectedCategoryId
    }
  })
  emit('update:notes', res.data.value)
}

const createNote = async () => {
  if (!form.title.trim() && !form.text.trim()) {
    toast.error('Please enter a title, text and select categories.')
    return
  }
  if (!form.title.trim()) {
    toast.error('Please enter a title.')
    return
  }
  // if (!form.categoryId) {
  //   toast.error('Please enter a category.')
  //   return
  // }
  // TODO: Validate form
  loading.value = true

  try {
    const payload = {
      title: form.title,
      text: form.text,
      categoryId: form.categoryId || null
    }
    await useApiRequest(routes.notes.list(), {
      key: 'notes' + new Date().getMilliseconds(),
      method: 'POST',
      body: payload
    })
    if (props.selectedCategoryId === form.categoryId) {
      await fetchNotes()
    }
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
