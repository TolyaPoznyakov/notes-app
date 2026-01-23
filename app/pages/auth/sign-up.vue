<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Sign Up</CardTitle>
        <CardDescription class="text-center">Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="signUp">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="email">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Email</FieldLabel>
                <Input
                  v-bind="field"
                  type="email"
                  placeholder="Enter your email"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="username">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Username</FieldLabel>
                <Input
                  v-bind="field"
                  type="text"
                  placeholder="Enter your username"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="password">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Password</FieldLabel>
                <Input
                  v-bind="field"
                  type="password"
                  placeholder="Enter your password"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="confirmPassword">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  v-bind="field"
                  type="password"
                  placeholder="Confirm your password"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
          <Button type="submit" class="mt-5 cursor-pointer">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      username: z.string().min(3),
      password: z.string().min(6),
      confirmPassword: z.string().min(6)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
})

const signUp = handleSubmit(async (values) => {
  await useApiRequest(routes.auth.register(), {
    method: 'POST',
    body: values
  })
  toast.success('User registered successfully')
  navigateTo('/auth/sign-in')
})
</script>
