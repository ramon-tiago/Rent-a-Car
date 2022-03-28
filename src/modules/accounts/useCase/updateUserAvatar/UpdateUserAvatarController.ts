import { Request, Response } from "express";
import { container } from "tsyringe";
import { joker } from "@utils/joker";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

    async handle(req: Request, res: Response) {
        const avatar_file = req.file.filename
        const user_id = joker.user.id
        const usecase = container.resolve(UpdateUserAvatarUseCase)
        await usecase.execute({user_id, avatar_file })

        return res.status(201).send('Avatar updated success')
    }

}

export { UpdateUserAvatarController }