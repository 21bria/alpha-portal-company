export function usePublicApi() {
  const config = useRuntimeConfig()

  async function request<T>(
    endpoint: string,
    options: any = {}
  ): Promise<T> {
    const { query, ...rest } = options

    const base = String(config.public.apiBaseUrl || '').replace(/\/$/, '')

    let path = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`

    if (base.endsWith('/api') && path.startsWith('/api/')) {
      path = path.replace(/^\/api/, '')
    }

    return await $fetch<T>(
      `${base}${path}`,
      {
        ...rest,
        query
      }
    )
  }

  return { request }
}