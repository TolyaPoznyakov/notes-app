export const useUser = () => {
  const user = useState('user', () => null)

  const setUser = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }
  const isAuthenticated = computed(() => user.value !== null)

  return {
    user: readonly(user),
    setUser,
    clearUser,
    isAuthenticated
  }
}