import { getRepository, Repository } from "typeorm";
import { User } from "@entities/User";
import { ICreateuserDTO, IUserRespository } from "../IUserRespository";

class UserRespository implements IUserRespository {
    private repository: Repository<User>

    constructor () {
        this.repository = getRepository(User)
    }
    async create({ name, password, email, driver_licence, admin, avatar, id }: ICreateuserDTO): Promise<void> {
        const user = this.repository.create({ name, password, email, driver_licence, admin, avatar, id })
        await this.repository.save(user)
    }
    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({email})
        return user
    }
    async findById(id: string): Promise<User> {
        const user = this.repository.findOne(id)
        return user
    }
    async list(): Promise<User[]> {
        const users = this.repository.find()
        return users
    }
    updateAvatar({ user_id, avatar_file }: { user_id: any; avatar_file: any; }): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { UserRespository }