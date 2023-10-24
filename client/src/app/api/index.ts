import { User, Config, RequestResponse } from '@/api/types'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
let isRefreshing = false

const config: Config = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}

const request = async (method: string, url: string, arg?: object): Promise<RequestResponse | undefined> => {
  const resource = `${apiUrl}/${url}`
  const options = {
    method,
    body: arg ? JSON.stringify(arg): null,
    ...config,
  }

  try {
    let res = await fetch(resource, options)

    if (! res.ok) {
      if (res.status === 403 && window.location.pathname !== '/login') {
        window.location.href = '/login'
        return
      }

      if (res.status === 401 && res.statusText === 'Unauthorized' && ! isRefreshing) {
        isRefreshing = true
        const refreshResponse = await request('POST', 'auth/refresh-token')
        isRefreshing = false

        if (! refreshResponse?.res?.ok) {
          window.location.href = '/login'
          return
        }

        res = await fetch(resource, options)
        return { res }
      }

      return { error: res.statusText }
    }
    
    return { res }
  } catch (error) {
    return { error: error.message }
  }
}

export const register = async (url: string, { arg }: { arg: User }) => {
  return request('POST', url, arg)
}

export const login = async (url: string, { arg }: { arg: User }) => {
  return request('POST', url, arg)
}

export const logout = async (url: string) => {
  return request('POST', url)
}

export const getUser = async (url: string) => {
  return request('GET', url)
}
