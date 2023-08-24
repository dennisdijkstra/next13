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

export const register = async (url: string, { arg }: { arg: User }) => {
  await fetch(`${apiUrl}/${url}`, {
    method: 'POST',
    body: JSON.stringify(arg),
    ...config,
  })
}

export const logout = async (url: string) => {
  await fetch(`${apiUrl}/${url}`, {
    method: 'POST',
    ...config,
  })
}