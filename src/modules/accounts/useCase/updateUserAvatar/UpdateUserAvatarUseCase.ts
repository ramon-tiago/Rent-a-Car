import { inject, injectable } from "tsyringe";
import { ICreateuserDTO, IUserRespository } from "../../repository/IUserRespository";
import { AppError } from "@errors/AppError";
import { deleteFile } from "@utils/file"

interface IRequest {
    user_id: string,
    avatar_file: string,
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRespository")
        private userRespository: IUserRespository
    ) {}

    async execute({user_id, avatar_file}:IRequest):Promise<void> {
        const user = await this.userRespository.findById(user_id)
        if (!user) {
            throw new AppError('User Id Already exists')
        }
        user.avatar && await deleteFile(`./tmp/avatar/${user.avatar}`)
        
        user.avatar = avatar_file;
        await this.userRespository.create(user)
    }

}


export { UpdateUserAvatarUseCase }