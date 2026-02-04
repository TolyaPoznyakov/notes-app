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
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest.js'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { FieldError } from '~/components/ui/field/index.js'

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

const emit = defineEmits(['update:notes'])

const loading = ref(false)

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

const createNote = handleSubmit(async (values) => {
  loading.value = true

  try {
    const payload = {
      title: values.title,
      text: values.text,
      categoryId: categoryId.value || null
    }
    await useApiRequest(routes.notes.list(), {
      key: 'notes' + new Date().getMilliseconds(),
      method: 'POST',
      body: payload
    })
    if (props.selectedCategoryId === categoryId.value) {
      await fetchNotes()
    }
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
