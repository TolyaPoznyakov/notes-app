import { useUser } from '~/composables/useUser'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useUser()
  if (!isAuthenticated.value) {
    return navigateTo('/auth/sign-in')
  }
})
