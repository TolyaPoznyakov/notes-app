<template>
  <VeeField v-slot="{ field, errors }" :name="name">
    <Field :data-invalid="!!errors.length">
      <FieldLabel v-if="label">{{ label }}</FieldLabel>
      <component
        :is="componentType"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :aria-invalid="!!errors.length"
      />
      <FieldError v-if="!!errors.length" :errors="errors" />
    </Field>
  </VeeField>
</template>

<script setup>
import { Field as VeeField } from 'vee-validate'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  as: { type: String, default: 'input' }
})

const componentType = computed(() => {
  if (props.as === 'textarea') return Textarea
  return Input
})
</script>
