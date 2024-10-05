import { Response } from "@/lib/response";

export interface UserModel {
	ID: number	
	Username: string
	Email: string
	Password: string
	CreatedAt: string
	UpdatedAt: string
}

export type LoginFormModel = {
	email: string
	password: string
}
type ResponseLoginUser = {
	user: UserModel | null
	accessToken: string | null
}
export const RequestLogin = async ({ email, password }: LoginFormModel): Promise<Response<ResponseLoginUser | null>> => {
	return {
		Message: 'Success',
		Data: null,
		Status: '1'
	}
}

export type RegisterFormModel = {
	email: string 
	username: string 
	password: string 
}
export const RequestRegister = async ({ email, username, password }: RegisterFormModel): Promise<Response<null>> => {
	return {
		Message: 'Success',
		Data: null,
		Status: '1'
	}
}
