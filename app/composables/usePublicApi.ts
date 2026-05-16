export function usePublicApi() {
  const config = useRuntimeConfig()

  async function request<T>(
    endpoint: string,
    options: any = {}
  ) {
    return await $fetch<T>(
      `${config.public.apiBaseUrl}${endpoint}`,
      {
        ...options,
      }
    )
  }

  return { request }
}