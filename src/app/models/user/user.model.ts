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

// export class UserImpl implements User
// {
//     // readonly firstName: string;

//     constructor(
//         public id?: string,
//         public firstname?: string,
//         public name?: string,
//         public login?: string,
//         public email?: string,
//         public shop?: string,
//         public role?: string,
//         public lastConnection?: string,
//         public phone?: string,
//         public orders?: any[]
//     ) {
//         // this.firstname = firstname;
//     }
// }
