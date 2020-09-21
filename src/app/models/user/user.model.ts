export interface User {
    id: string,
    firstname: string,
    name: string,
    lastConnection: string,
    login: string,
    //todo
    orders?: any[], 
    password: string,
    role: string
    firstConnection?: boolean
}
