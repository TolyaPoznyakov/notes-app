<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Sign Up</CardTitle>
        <CardDescription class="text-center">Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="signUp">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldGroup>
              <Input v-model="form.email" type="email" placeholder="Enter your email" />
              <!-- <FieldError v-if="!form.email">Email is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel class="mt-3">Username</FieldLabel>
            <FieldGroup>
              <Input v-model="form.username" type="text" placeholder="Enter your username" />
              <!-- <FieldError>Username is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel class="mt-3">Password</FieldLabel>
            <FieldGroup>
              <Input v-model="form.password" type="password" placeholder="Enter your password" />
              <!-- <FieldError>Password is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel class="mt-3">Confirm Password</FieldLabel>
            <FieldGroup>
              <Input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
              <!-- <FieldError>Confirm password is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Button class="mt-5 cursor-pointer" type="submit">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const signUp = async () => {
  if (
    !form.email.trim() &&
    !form.username.trim() &&
    !form.password.trim() &&
    !form.confirmPassword.trim()
  ) {
    toast.error('Please fill in all fields')
    return
  }

  if (!form.email.trim()) {
    toast.error('Please enter email.')
    return
  }

  if (!form.username.trim()) {
    toast.error('Please enter username.')
    return
  }

  if (!form.password || !form.password.trim()) {
    toast.error('Please enter password.')
    return
  }

  if (!form.confirmPassword || !form.confirmPassword.trim()) {
    toast.error('Please confirm your password.')
    return
  }

  if (form.password !== form.confirmPassword) {
    // TODO: Validate form
    toast.error('Passwords do not match.')
    return
  }

  try {
    await useApiRequest(routes.auth.register(), {
      method: 'POST',
      body: form
    })
    toast.success('User registered successfully!')
    navigateTo('/auth/sign-in')
  } catch (e) {
    toast.error('Registration failed.')
    console.error(e)
  }
}
</script>
