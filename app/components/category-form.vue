<template>
  <form class="grid gap-4" @submit.prevent="submit">
    <VeeField v-slot="{ field, errors }" name="name">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Name *</FieldLabel>
        <Input v-bind="field" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="description">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Description</FieldLabel>
        <Input v-bind="field" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="color">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Color</FieldLabel>
        <Input v-bind="field" :aria-invalid="!!errors.length" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <Button type="submit" class="w-30 cursor-pointer hover:scale-103" variant="outline"
      >Save</Button
    >
  </form>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { useCategoriesStore } from '~/store/categories.js'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Field, FieldLabel } from '~/components/ui/field/index.js'
import { Button } from '~/components/ui/button/index.js'

const categoriesStore = useCategoriesStore()

const props = defineProps({
  closeModal: {
    type: Function,
    default: null
  }
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    color: z.string().optional()
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    description: '',
    color: ''
  }
})

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      name: values.name,
      description: values.description,
      color: values.color || null
    }
    await categoriesStore.create(payload)

    toast.success('Category has been created')
    resetForm()
    if (props.closeModal) {
      props.closeModal()
    }
  } catch (error) {
    toast.error('Failed to create category')
    console.error(error)
  }
})
</script>
