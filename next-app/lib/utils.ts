import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {UseFormReturn} from "react-hook-form"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getLang = (short: boolean = false) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const locale: string = !!navigator && (navigator.language || navigator.browserLanguage || (navigator.languages || ['en-US']) [0])
    return short ? locale.split('-').shift() : locale
}

export const getInitials = (fullName?: string): string => {
    if (!fullName) return ''

    const names = fullName.trim().split(' ')

    if (names.length === 0) return ''
    if (names.length === 1) return names[0]!.charAt(0).toUpperCase()

    return `${names[0]!.charAt(0)}${names[names.length - 1]!.charAt(0)}`.toUpperCase()
}

export const parseError = (error: Error | string, form?: UseFormReturn<any>) => {
    const errorString = error instanceof Error ? error.message : error
    let message = errorString
    const errors: { [key: string]: Array<{ message: string }> } = {}
    try {
        // Parse the custom error object thrown from the server
        const errorData = JSON.parse(errorString)
        if (errorData.type === 'ValidationError') {
            Object.keys(errorData.errors).forEach((key) => {
                errors[key] = []
                errorData.errors[key].map((errorText: string) => {
                    if (form) {
                        // @ts-ignore
                        form.setError(key, {message: errorText})
                    }
                    // @ts-ignore
                    errors[key].push({message: errorText})
                })
            })
            if (form) {
                form.setError('root.serverError', {message: errorData.message})
            }
        } else {
            // Handle other types of errors
            console.error("An unexpected error occurred:", errorData.message)
            if (form) {
                form.setError('root.serverError', {message: errorData.message})
            }
        }
        message = errorData.message
    } catch (parseError) {
        // Fallback for non-JSON errors
        console.warn("Could not parse error message:", errorString)
        // toast.error("Something went wrong. Please try again later.")
    }
    return {message, errors}
}