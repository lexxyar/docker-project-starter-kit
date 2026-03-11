import ValidationError from "@/classes/ValidationError"
import Cookies from "js-cookie"

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Базовый URL для API (можно вынести в .env.local)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'


export default function apiClient() {
    const baseUrl = () => BASE_URL

    const request = async <T = any>(endpoint: string, method: THttpMethod = 'GET', payload: any = undefined, headers: Record<string, string> = {}): Promise<T> => {
        // --- Получаем токен из localStorage ---
        // Проверяем, что код выполняется на клиенте
        // const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        const storedToken = Cookies.get('authToken') ?? null

        const requestHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers, // Позволяет переопределять или добавлять заголовки
        }

        // --- Добавляем токен в заголовок Authorization, если он существует ---
        if (storedToken) {
            requestHeaders['Authorization'] = `Bearer ${storedToken}`
        }

        const url = `${BASE_URL}${endpoint}`

        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            // Добавляем тело запроса только для методов, которые его поддерживают
            ...(payload !== undefined && payload !== null ? {body: JSON.stringify(payload)} : {}),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: 'Failed to parse error response'}))

            const errorMessage = errorData.message || `API request failed (${response.status}): ${response.statusText}`

            // Validation error
            if (response.status === 422) {
                throw new ValidationError(errorMessage, errorData.errors)
            }

            // Важно: бросьте Error, чтобы вызывающая сторона могла обработать ошибку
            throw new Error(errorMessage)
        }

        // Для некоторых методов сервер может не возвращать тело
        if (response.status === 204 || method === 'DELETE' && response.headers.get('content-length') === '0') {
            return undefined as T // или null
        }

        const data: unknown = await response.json() // Используем unknown для безопасности
        return data as T // Предполагаем, что вызывающая сторона знает тип T
    }

    const get = async <T = any>(endpoint: string, headers = {}): Promise<T> => {
        return await request<T>(endpoint, 'GET', null, headers)
    }

    const post = async <T = any>(endpoint: string, payload: any = undefined, headers = {}): Promise<T> => {
        return await request<T>(endpoint, 'POST', payload, headers)
    }

    const put = async <T = any>(endpoint: string, payload: any = undefined, headers = {}): Promise<T> => {
        return await request<T>(endpoint, 'PUT', payload, headers)
    }

    const patch = async <T = any>(endpoint: string, payload: any = undefined, headers = {}): Promise<T> => {
        return await request<T>(endpoint, 'PATCH', payload, headers)
    }

    const deleteRequest = async <T = any>(endpoint: string, payload: any = undefined, headers = {}): Promise<T> => {
        return await request<T>(endpoint, 'DELETE', payload, headers)
    }

    return {request, get, put, patch, post, delete: deleteRequest, baseUrl}
}