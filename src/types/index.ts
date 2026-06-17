export interface JobApplication {
    id: number
    company: string
    position: string
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected'
    appliedAt: string
    updatedAt: string | null
    notes: string | null
    jobUrl: string | null
}

export interface AuthResponse {
    token: string
    email: string
}

export interface Stats {
    total: number
    applied: number
    interview: number
    offer: number
    rejected: number
    interviewRate: number
    offerRate: number
}