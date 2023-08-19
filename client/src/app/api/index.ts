const apiUrl = process.env.NEXT_PUBLIC_API_URL

type User = {
  email: string
  password: string
}

export const createUser = async (url: string, { arg }: { arg: User }) => {
  await fetch(`${apiUrl}/${url}`, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}