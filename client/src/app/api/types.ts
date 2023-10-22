export type User = {
	email: string
	password: string
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
