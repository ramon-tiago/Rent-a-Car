import { inject, injectable } from "tsyringe";
import { UserRespository } from "../../repository/implementatios/UserRespository";
import { ICreateuserDTO, IUserRespository } from "../../repository/IUserRespository";
import { hash } from "bcryptjs"
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRespository")
        private userRespository: IUserRespository
    ) {}

    async execute({name, password, email, driver_licence, admin}:ICreateuserDTO):Promise<void> {
        const userExists = await this.userRespository.findByEmail(email)

        if (userExists) {
            throw new AppError('Username Already exists')
        }
        const passwordHash = await hash(password, 8)
        await this.userRespository.create({name, password: passwordHash, email, driver_licence, admin})
    }

}


export { CreateUserUseCase }