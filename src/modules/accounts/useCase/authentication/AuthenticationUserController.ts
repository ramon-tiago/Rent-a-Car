import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase";


class AuthenticationUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body
        const useCase = container.resolve(AuthenticationUserUseCase)
    
        const result = await useCase.execute({ email, password })
        return res.status(201).json(result)
    }
}

export { AuthenticationUserController }