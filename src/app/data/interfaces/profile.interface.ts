export interface Profile {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    stack: string[];
    city: string;
    description: string;
}


// export interface Profile {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: Address;
//     phone: string;
//     website: string;
//     company: Company;
// }

// export interface Address {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: Geo;
// }

// export interface Geo {
//     lat: string;
//     lng: string;
// }

// export interface Company {
//     name: string;
//     catchPhrase: string;
//     bs: string;
// }
