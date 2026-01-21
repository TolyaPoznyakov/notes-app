<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription class="text-center">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="signIn">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldGroup>
              <Input v-model="form.email" type="email" placeholder="Enter your email" />
              <!-- <FieldError v-if="!form.email">Email is required</FieldError> -->
            </FieldGroup>
          </Field>
          <Field>
            <FieldLabel class="mt-3">Password</FieldLabel>
            <FieldGroup>
              <Input v-model="form.password" type="password" placeholder="Enter your password" />
              <!-- <FieldError>Password is required</FieldError> -->
            </FieldGroup>
          </Field>
          <div class="mt-5 flex justify-between">
            <Button class="cursor-pointer" :disabled="loading" type="submit">Sign In</Button>
            <CardDescription class="text-center mt-2"
              >Don't have an account?
              <NuxtLink to="/auth/sign-up" class="font-medium text-primary hover:underline"
                >Sign up</NuxtLink
              >
            </CardDescription>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import routes from '~/const/routes'
import { useUser } from '~/composables/useUser'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button/index.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card/index.js'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field/index.js'
import { Input } from '~/components/ui/input/index.js'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const form = reactive({
  email: '',
  password: ''
})

const user = useUser()
const loading = ref(false)

const signIn = async () => {
  if (!form.email.trim() && !form.password.trim()) {
    toast.error('Please enter email and password.')
    return
  }

  if (!form.email.trim()) {
    toast.error('Please enter email.')
    return
  }

  if (!form.password.trim()) {
    toast.error('Please enter password.')
    return
  }
  try {
    loading.value = true

    const res = await useApiRequest(routes.auth.login(), {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password
      }
    })

    const { accessToken, refreshToken } = res.data.value

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    console.log('accessToken', accessToken)
    user.setUser(null)

    const profileRes = await useApiRequest(routes.auth.profile(), {
      key: 'profile' + new Date().getMilliseconds() // обхід useFetch кешування
    })
    user.setUser(profileRes.data.value)

    toast.success('Successfully signed in!')

    await navigateTo('/')
  } catch (e) {
    toast.error('Invalid email or password.')
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
