export type User = {
  id?: string,
	email: string
	password: string
  firstName?: string
  lastName?: string
}
  
export type Config = {
	headers: {
    'Content-Type': string 
	},
	credentials: RequestCredentials
}

export type RequestResponse = {
    res?: Response,
    error?: string,
}
