export interface User {
    // id: string,
    firstname: string,
    name: string,
    lastConnection?: string,
    login: string,
    email: string,
    phone?: string,
    orders?: any[], 
    role: string,
    shop: string
}

// export class User {

//     constructor(
//         public id?: string,
//         public lastName?: string,
//         public firstName?: string
//     )

// }

// toto = new User();
