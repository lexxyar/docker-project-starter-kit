import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLang = (short: boolean = false) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const locale: string = !!navigator && (navigator.language || navigator.browserLanguage || (navigator.languages || ['en-US'])[0])
  return short ? locale.split('-').shift() : locale
}

export const getInitials = (fullName?: string): string => {
  if (!fullName) return ''

  const names = fullName.trim().split(' ')

  if (names.length === 0) return ''
  if (names.length === 1) return names[0]!.charAt(0).toUpperCase()

  return `${names[0]!.charAt(0)}${names[names.length - 1]!.charAt(0)}`.toUpperCase()
}