<template>
  <Card class="mb-5 w-md p-4">
    <VeeField v-slot="{ field, errors }" name="title">
      <Field :data-invalid="!!errors.length">
        <Input v-bind="field" placeholder="Title" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="text">
      <Field :data-invalid="!!errors.length">
        <Textarea v-bind="field" placeholder="Text" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <CategoryAutocomplete v-model="categoryId" :categories="categories" />

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
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { useNotesStore } from '~/store/notes'
import { useCategoriesStore } from '~/store/categories.js'
import { storeToRefs } from 'pinia'

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()
const { categories, selectedCategoryId } = storeToRefs(categoriesStore)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Title is required'),
    text: z.string().min(1, 'Text is required')
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    text: ''
  }
})

const categoryId = ref(props.selectedCategoryId !== 'all' ? props.selectedCategoryId : null)


const loading = ref(false)
// local state
const form = reactive({
  title: '',
  text: '',
  categoryId: selectedCategoryId.value !== 'all' ? selectedCategoryId.value : null
})

const createNote = handleSubmit(async (values) => {
  loading.value = true

  try {
    const payload = {
      title: values.title,
      text: values.text,
      category: categoryId.value || null
    }
    await notesStore.create(payload)
    toast.success('Note has been created')
    resetForm()
    categoryId.value = null
  } catch (error) {
    toast.error('Failed to create note')
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>
