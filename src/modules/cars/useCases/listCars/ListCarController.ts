import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListCarUseCase } from "./ListCarUseCase";


class ListCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCarUseCase = container.resolve(ListCarUseCase)

        const car = await listCarUseCase.execute()

        return res.json(car)
    }
}

export { ListCarController }