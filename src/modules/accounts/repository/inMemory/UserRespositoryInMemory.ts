import { User } from "@entities/User";
import { ICreateuserDTO, IUserRespository } from "../IUserRespository";


class UserRespositoryInMemory implements IUserRespository {
    user: User[]= []

    async create({ name, password, email, driver_licence, admin, avatar }: ICreateuserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name, password, email, driver_licence, admin, avatar
        })
        this.user.push(user)
    }
    async findByEmail(email: string): Promise<User> {        
        return this.user.find(u => u.email === email)
    }
    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async updateAvatar({ user_id, avatar_file }: { user_id: any; avatar_file: any; }): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { UserRespositoryInMemory }