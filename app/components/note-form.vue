<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <VeeField v-slot="{ errors }" name="title">
      <Field :data-invalid="!!errors.length">
        <Input v-model="title" v-bind="titleAttrs" placeholder="Title" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ errors }" name="text">
      <Field :data-invalid="!!errors.length">
        <Textarea v-model="text" v-bind="textAttrs" placeholder="Text" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <CategoryAutocomplete v-model="categoryId" :categories="categories" />
    <Button
      type="submit"
      class="w-30 cursor-pointer hover:scale-103"
      variant="outline"
      :disabled="loading"
    >
      {{ isEdit ? 'Edit note' : 'Add note' }}
    </Button>
  </form>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { useNotesStore } from '~/store/notes'
import { useCategoriesStore } from '~/store/categories.js'
import { storeToRefs } from 'pinia'

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()
const { categories, selectedCategoryId } = storeToRefs(categoriesStore)

const props = defineProps({
  note: {
    type: Object,
    default: null
  },
  closeModal: {
    type: Function,
    default: null
  }
})

const isEdit = computed(() => props.note !== null)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Title is required'),
    text: z.string().min(1, 'Text is required')
  })
)

const { handleSubmit, resetForm, defineField, setValues } = useForm({
  validationSchema: formSchema
})

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')

const categoryId = ref(selectedCategoryId.value !== 'all' ? selectedCategoryId.value : null)

const loading = ref(false)

const submit = handleSubmit(async (values) => {
  loading.value = true

  try {
    const payload = {
      title: values.title,
      text: values.text,
      category: categoryId.value || null
    }
    if (isEdit.value) {
      await notesStore.update(props.note._id, payload)
    } else {
      await notesStore.create(payload)
    }
    toast.success(isEdit.value ? 'Note has been updated' : 'Note has been created')
    resetForm()
    if (props.closeModal) {
      props.closeModal()
    }
    categoryId.value = null
  } catch (error) {
    toast.error('Failed to create note')
    console.error(error)
  } finally {
    loading.value = false
  }
})

onMounted(() => {
  if (isEdit.value) {
    setValues({
      title: props.note.title,
      text: props.note.text
    })
  }
})
</script>
