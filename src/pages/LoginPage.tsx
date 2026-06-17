import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await login(email, password)
            console.log('Login response:', response)
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', response.email)
            navigate('/dashboard')
        } catch (err) {
                console.log('Login error:', err)

            setError('Invalid email od password')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 24}}>
            <h1>Job Tracker</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16}}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
                        required
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: 8, marginTop: 4}}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit' disabled={loading} style={{ width: '100%', padding: 10}}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={{ marginTop: 16}}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}