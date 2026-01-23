import { useApiRequest } from '~/composables/apiRequest.js'
import routes from '~/const/routes'

export const useUser = () => {
  const user = useState('user', () => null)

  const setUser = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const isAuthenticated = computed(() => user.value !== null)

  const loadUser = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token || user.value) return

    try {
      const res = await useApiRequest(routes.auth.profile())
      user.value = res.data.value
    } catch {
      clearUser()
    }
  }

  return {
    user: readonly(user),
    setUser,
    clearUser,
    isAuthenticated,
    loadUser
  }
}
