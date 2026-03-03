import type {
    RouteLocationAsPathGeneric,
    RouteLocationAsRelativeGeneric,
    RouteLocationAsString,
    RouteLocationRaw
} from "vue-router"

export type TLinkHref =
    RouteLocationAsRelativeGeneric
    | RouteLocationAsString
    | RouteLocationAsPathGeneric
    | RouteLocationRaw
    | string

export type TInputProps = {
    id?: string,
    type?: HTMLInputElement['type'],
    required?: boolean,
    disabled?: boolean,
    placeholder?: string,
    class?: string,
    hasError?: boolean,
    autocomplete?: string,
    autofocus?: boolean,
    value?: any,
}

export type TLabelProps = {
    forId?: string,
    hasError?: boolean,
    disabled?: boolean,
    class?: string,
}

export type TUser = {
    id: string,
    name: string,
    email: string,
}

export type TSocialProvider = 'yandex' | 'google'