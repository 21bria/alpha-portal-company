export function usePublicApi() {
  const config = useRuntimeConfig()

  const buildUrl = (
    endpoint: string,
    query?: Record<string, any>
  ) => {
    const cleanQuery = Object.fromEntries(
      Object.entries(query || {}).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    )

    const qs = new URLSearchParams(
      Object.entries(cleanQuery).reduce((acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      }, {} as Record<string, string>)
    ).toString()

    const base = String(config.public.apiBaseUrl || "").replace(/\/$/, "")
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

    return `${base}${path}${qs ? `?${qs}` : ""}`
  }

  async function request<T>(
    endpoint: string,
    options: any = {}
  ): Promise<T> {

    const {
      query,
      ...rest
    } = options

    return await $fetch<T>(
      buildUrl(endpoint, query),
      {
        ...rest
      }
    )
  }

  return {
    request,
    buildUrl
  }
}