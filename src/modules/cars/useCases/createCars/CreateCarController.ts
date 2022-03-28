import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";


class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createCarUseCase = container.resolve(CreateCarUseCase)

        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id

        } = req.body
        const data = {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        }

        const car = await createCarUseCase.execute(data)

        return res.json(car)
    }
}

export { CreateCarController }