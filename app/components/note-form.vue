<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <Input v-model="form.title" placeholder="Title" />
    <Textarea v-model="form.text" placeholder="Text" />
    <CategoryAutocomplete v-model="form.categoryId" :categories="categories" />
    <Button
      type="submit"
      class="w-30 cursor-pointer hover:scale-103"
      variant="outline"
      :disabled="loading"
    >
      {{ note ? 'Save' : 'Add note' }}
    </Button>
  </form>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
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
  },
  note: {
    type: Object,
    default: null
  },
  closeModal: {
    type: Function,
    default: null
  }
})

const loading = ref(false)
// local state
const form = reactive({
  title: '',
  text: '',
  categoryId: props.selectedCategoryId !== 'all' ? props.selectedCategoryId : null
})

const submit = async () => {
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
      category: form.categoryId || null
    }
    if (props.note) {
      await notesStore.update(props.note._id, payload)
    } else {
      await notesStore.create(payload)
    }
    toast.success(props.note ? 'Note has been updated' : 'Note has been created')
    resetForm()
    if (props.closeModal) {
      props.closeModal()
    }
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

onMounted(() => {
  if (props.note) {
    form.title = props.note.title
    form.text = props.note.text
  }
})
</script>
