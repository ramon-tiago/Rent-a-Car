import { Request, Response } from "express";
import { container } from "tsyringe"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    async handle(req: Request, res: Response): Promise<void>{
       const { name, description } = req.body;
       const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
       await createCategoryUseCase.execute({name, description})
       res.send("Criado com sucesso")
    }

}

export {CreateCategoryController};