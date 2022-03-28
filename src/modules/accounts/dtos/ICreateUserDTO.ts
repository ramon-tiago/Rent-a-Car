
interface ICreateuserDTO {
    name: string
    password: string
    email: string
    driver_licence: string
    admin?: boolean
}

export { ICreateuserDTO }