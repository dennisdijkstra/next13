const { fetch: originalFetch } = window
const apiUrl = process.env.NEXT_PUBLIC_API_URL

type User = {
  email: string
  password: string
}

type Config = {
  headers: {
    'Content-Type': string 
  },
  credentials: RequestCredentials
}

const config: Config = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}

const request = async (method: string, url: string, arg?: object) => {
  try {
    const res = await fetch(`${apiUrl}/${url}`, {
      method,
      body: arg ? JSON.stringify(arg): null,
      ...config,
    })
      
    if (! res.ok) {
      return { error: res.statusText }
    }
  
    return { res }
  } catch (error) {
    return { error: error.message }
  }
}

const refreshToken = async () => {
  return request('POST', 'auth/refreshToken')
}

window.fetch = async (...args) => {
  const [resource, config ] = args
  const response = await originalFetch(resource, config)

  if (!response.ok && response.status === 401) {
    const refreshTokenResponse = await refreshToken()

    if (!refreshTokenResponse.ok) {
      return refreshTokenResponse
    }

    const initialResponse = await originalFetch(resource, config)
    return initialResponse
  }

  return response
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

