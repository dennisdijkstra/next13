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
  const res = await fetch(`${apiUrl}/${url}`, {
    method,
    body: arg ? JSON.stringify(arg): null,
    ...config,
  })

  if (! res.ok) {
    throw new Error(res.statusText)
  }

  return res
}

export const register = async (url: string, { arg }: { arg: User }) => {
  await request('POST', url, arg)
}

export const login = async (url: string, { arg }: { arg: User }) => {
  await request('POST', url, arg)
}

export const logout = async (url: string) => {
  await request('POST', url)
}