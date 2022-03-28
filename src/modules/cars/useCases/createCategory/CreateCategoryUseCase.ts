import { inject, injectable } from "tsyringe"
import { AppError } from "@errors/AppError";

import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

interface ICategory {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor( 
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {    
    }

    async execute({name, description }:ICategory ): Promise<void> {
        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadExists ) {
            throw new AppError("Category Already exists!");
        }

        this.categoriesRepository.create({name, description})
    }
}
    export { CreateCategoryUseCase };