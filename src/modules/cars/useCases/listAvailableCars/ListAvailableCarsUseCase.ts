import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository "
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm"

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository 
    ) {}

    async execute({brand, category_id, name}: IRequest): Promise<Car[]> {
        const list = await this.carsRepository.findAvailable(brand, category_id, name)    
        console.log(list, 'lista')
        return list   
    }
}

export { ListAvailableCarsUseCase }