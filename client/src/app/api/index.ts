import { User, Config } from '@/api/types'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
let isRefreshing = false

const config: Config = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}

type Options = {
  query?: object | undefined
  data?: object | undefined
}

const makeOptions = (method: string, payload: object): Options => {
  const options: Options = {}
  const key = method === 'GET' ? 'query' : 'data'

  options[key] = payload
  return options
}

const request = async (method: string, url: string, arg?: object) => {
  const { query, data } = makeOptions(method, arg)
  let resource = `${apiUrl}/${url}`

  if (query) {
    resource += `?${Object.keys(query).map((key) => `${key}=${query[key]}`).join('&')}`
  }

  const options = {
    method,
    body: data ? JSON.stringify(data): null,
    ...config,
  }

  try {
    const response = await fetch(resource, options)

    if (! response.ok) {
      if (response.status === 401 && response.statusText === 'Unauthorized' && ! isRefreshing) {
        isRefreshing = true
        const refreshResponse = await request('POST', 'auth/refresh-token')
        isRefreshing = false

        if (! refreshResponse?.res?.ok) {
          window.location.href = '/login'
          return
        }

        const initialResponse = await fetch(resource, options)
        const data = await initialResponse.json()

        return { res: data }
      }

      return { error: response.statusText }
    }
    
    const data = await response.json()
    return { res: data }
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

export const requestResetPassword = async (url: string, { arg }: { arg: { email: string } }) => {
  return request('POST', url, arg)
}

export const validateResetPasswordToken = async (args: Array<any>) => {
  const [url, arg] = args
  return request('GET', url, arg)
}

export const resetPassword = async (url: string, { arg }: { arg: { password: string, token: string, email: string } }) => {
  return request('POST', url, arg)
}

export const getUser = async (url: string) => {
  return request('GET', url)
}

export const updateUser = async (url: string, { arg }: { arg: { firstName: string | undefined, lastName: string | undefined }}) => {
  return request('PATCH', url, arg)
}
