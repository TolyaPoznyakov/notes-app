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
              <Input v-model="form.email" type="email" placeholder="Enter your email"/>
              <!-- <FieldError v-if="!form.email">Email is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <FieldGroup>
              <Input v-model="form.username" type="text" placeholder="Enter your username"/>
              <!-- <FieldError>Username is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldGroup>
              <Input v-model="form.password" type="password" placeholder="Enter your password"/>
              <!-- <FieldError>Password is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <FieldGroup>
              <Input v-model="form.confirmPassword" type="password" placeholder="Confirm your password" />
              <!-- <FieldError>Confirm password is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Button type="submit">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import {
  Field,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest'

definePageMeta({
  middleware: ['guest']
})

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const signUp = async () => {
  // TODO: Validate form
  if (form.password !== form.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }
  await useApiRequest(routes.auth.register(), {
    method: 'POST',
    body: form
  })
  toast.success('User registered successfully')
  navigateTo('/auth/sign-in')
}

</script>