import { User } from "@entities/User";

interface ICreateuserDTO {
    name: string;
    password: string;
    email: string;
    driver_licence: string;
    admin?: boolean;
    avatar?: string;
    id?: string
}

interface IUserRespository {

    create({name, password, email, driver_licence, admin, avatar, id }:ICreateuserDTO): Promise<void>;

    findByEmail(email: string ): Promise<User>;

    findById(id: string ): Promise<User>;

    list(): Promise<User[]>

    updateAvatar({user_id, avatar_file}): Promise<void>
}


export { IUserRespository, ICreateuserDTO }