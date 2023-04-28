interface IRole {
    id: number
    name: string
}

export interface MyAppContext {
    user: {
        id: number
        username: string
        email: string
        roles: IRole[]
        iat: number
        exp: number
    }
}