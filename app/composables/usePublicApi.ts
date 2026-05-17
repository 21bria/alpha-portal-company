export function usePublicApi() {
  const config = useRuntimeConfig()

  async function request<T>(
    endpoint: string,
    options: any = {}
  ): Promise<T> {

    const {
      query,
      ...rest
    } = options

    return await $fetch<T>(
      `${config.public.apiBaseUrl}${endpoint}`,
      {
        ...rest,
        query
      }
    )
  }

  return { request }
}