import client from './client'
import type { JobApplication, Stats } from '../types'

export const getAll = async (status?: string): Promise<JobApplication[]> => {
    const response = await client.get<JobApplication[]>('/jobapplications', {
        params: status ? { status } : {}
    })
    return response.data
}

export const getById = async (id: number): Promise<JobApplication> => {
    const response = await client.get<JobApplication>(`/jobapplications/${id}`)
    return response.data
}

export const create = async (data: {
    company: string
    position: string
    notes?: string
    jobUrl?: string
}): Promise<JobApplication> => {
    const response = await client.post<JobApplication>('/jobapplications', data)
    return response.data
}

export const update = async (id: number, data: {
    company?: string
    position?: string
    notes?: string
    jobUrl?: string
    status?: string
}): Promise<JobApplication> => {
    const response = await client.put<JobApplication>(`/jobapplications/${id}`, data)
    return response.data
}

export const remove = async (id: number): Promise<void> => {
    await client.delete(`/jobapplications/${id}`)
}

export const getStats = async (): Promise<Stats> => {
    const response = await client.get<Stats>('/jobapplications/stats')
    return response.data
}