const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

const config = () => {
    const baseUrl = BASE_URL
    return {baseUrl}
}

export default config