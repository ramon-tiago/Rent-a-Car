import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";



class CreateCarsSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { specifications_ids } = req.body

        const useCase = container.resolve(CreateCarsSpecificationUseCase)

        const create = await useCase.execute({car_id: id, specifications_ids })

        return res.status(201).json(create)
    }

}

export { CreateCarsSpecificationController }