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
            <base-form-field
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <base-form-field name="username" label="Username" placeholder="Enter your username" />
            <base-form-field
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <base-form-field
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />
          </FieldGroup>
          <div class="mt-5 flex justify-between">
            <Button type="submit" class="cursor-pointer">Sign Up</Button>
            <CardDescription class="text-center mt-2">
              Already have an account?
              <NuxtLink to="/auth/sign-in" class="font-medium text-primary hover:underline"
                >Sign in</NuxtLink
              >
            </CardDescription>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { FieldGroup } from '@/components/ui/field'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import BaseFormField from '~/components/base-form-field.vue'

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
