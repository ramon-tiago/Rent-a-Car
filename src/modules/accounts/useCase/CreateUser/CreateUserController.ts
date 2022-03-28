import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(req: Request, res: Response) {
        const { name, password, email, driver_licence, admin } = req.body
        const usecase = container.resolve(CreateUserUseCase)
        await usecase.execute({name, password, email, driver_licence, admin})

        return res.status(201).send('User Create with sucess')
    }

}

export { CreateUserController }