export interface User {
    id: string,
    firstname: string,
    name: string,
    lastConnection?: string,
    login: string,
    email: string,
    phone?: string,
    orders?: any[], 
    role: string
}
