import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

type User = {
  email: string
  password: string
}

type Config = {
  headers: {
    'Content-Type': string 
  },
  withCredentials: boolean
}

const config: Config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const request = async (method: string, url: string, arg?: object) => {
  try {
    const res = await axios({
      method,
      url: `${apiUrl}/${url}`,
      ...(arg && { data: JSON.stringify(arg) }),
      ...config,
    })
  
    return { res }
  } catch (error) {
    return { error: error.message }
  }
}

export const refreshToken = async () => {
  return request('POST', 'auth/refreshToken')
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

