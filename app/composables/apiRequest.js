import routes from '~/const/routes.js'
import { toast } from 'vue-sonner'

const defaultRetryConfig = {
  attempts: 1
}

const getRetryConfig = (config) => {
  return {
    attempts: config.attempts || defaultRetryConfig.attempts
  }
}

export const useApiRequest = async (url, options = {}, config = {}) => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiUrl
  const method = options.method || 'GET'
  const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    ...config.headers
  }

  const retryConfig = getRetryConfig(config)

  try {
    let response = null
    for (let attempt = 1; attempt <= retryConfig.attempts; attempt++) {
      response = await useFetch(apiUrl + url, {
        ...options,
        method,
        headers,
        key: 'request' + new Date().getMilliseconds()
      })

      if (!response?.error?.value) break

      const statusCode = response.error?.value?.statusCode
      const isUnauthorized = statusCode === 401
      if (isUnauthorized) {
        const refreshResponse = await useFetch(apiUrl + routes.auth.refresh(), {
          method: 'POST',
          headers: {
            accept: 'application/json'
          },
          body: {
            refreshToken: localStorage.getItem('refreshToken')
          },
          key: 'refresh' + new Date().getMilliseconds()
        })

        if (refreshResponse.error.value) {
          throw new Error('Failed to refresh token')
        }

        const { accessToken, refreshToken } = refreshResponse.data.value
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        headers.Authorization = 'Bearer ' + accessToken
        retryConfig.attempts++
        continue
      }
    }
    return response
  } catch (error) {
    toast.error(error.message)
  }
}
