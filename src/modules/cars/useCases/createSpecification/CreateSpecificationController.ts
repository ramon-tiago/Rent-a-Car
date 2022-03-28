import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    async handle(req: Request, res: Response) {
        const { name, description } = req.body

        console.log("ok...")
        console.log("ok...")
        
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
        console.log("ok...")
        console.log("ok...")

        await createSpecificationUseCase.execute({name, description})        
        res.status(201).send("Specification Criada com Sucesso!")
    }
}

export { CreateSpecificationController }