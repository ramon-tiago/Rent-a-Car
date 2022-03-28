import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {

    async handle(req: Request, res: Response) {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase)
        const categories = await listCategoryUseCase.execute();
       res.json(categories);
   }

}

export {ListCategoryController};