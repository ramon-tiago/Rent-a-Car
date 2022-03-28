import { ICarsRepository } from "@modules/cars/repository/ICarsRepository ";
import { AppError } from "@utils/errors/AppError";
import { Repository } from "typeorm";

interface IRequest {
    car_id: string;
    specification: string[];
}

class CreateCarsSpecificationUseCase {
    // private repository: Repository

    constructor(

        private carsRepository: ICarsRepository
    ) {}
 
    async execute({car_id, specification}:IRequest) : Promise<void>{

        const exists = await this.carsRepository.findById(car_id)

        if(!exists) throw new AppError("Car does not exists!")

  
    }

}

export { CreateCarsSpecificationUseCase }