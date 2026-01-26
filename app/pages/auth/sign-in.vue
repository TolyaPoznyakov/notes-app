<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription class="text-center">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="signIn">
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
          </FieldGroup>
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
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field/index.js'
import { Input } from '~/components/ui/input/index.js'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const user = useUser()
const loading = ref(false)

const signIn = handleSubmit(async (values) => {
  try {
    loading.value = true

    const res = await useApiRequest(routes.auth.login(), {
      method: 'POST',
      body: values
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
})
</script>
