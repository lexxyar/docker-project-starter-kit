export default class ValidationError extends Error {
    public errors: any = {}

    public constructor(message?: string, errors?: any, options?: ErrorOptions) {
        super(message, options)
        this.errors = errors
    }
}