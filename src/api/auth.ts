import client from './client'
import type { AuthResponse } from '../types'

export const register = async (email: string, password: string) : Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/register', { email, password })
    return response.data
}

export const login = async (email: string, password: string) : Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/login', { email, password })
    return response.data
}