export type ApiResponseType<T> = {
    message?: string,
    data?: T
    error?: string
}