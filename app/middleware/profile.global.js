export default defineNuxtRouteMiddleware(async () => {
  const { user, loadUser } = useUser()
  if (!user.value) {
    await loadUser()
  }
})
