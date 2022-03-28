import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
    async handle(req: Request, res: Response) {
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase)
        const list = await listSpecificationsUseCase.execute();
        res.json(list)
    }

}

export { ListSpecificationsController }