const API_URL = 'http://localhost:55681/api'

export const apiFetch = async (endpoint, options = {}) => {

    const token = localStorage.getItem('token')

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    )

    // Token expired or invalid
    if (response.status === 401) {

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        window.location.href = '/login'

        return response
    }

    return response
}

export default API_URL