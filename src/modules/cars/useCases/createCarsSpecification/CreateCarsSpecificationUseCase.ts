import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository ";
import { ISpecificationsRepository } from "@modules/cars/repository/ISpecificationsRepository";
import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_ids: string[];
}
@injectable()
class CreateCarsSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private spscificationsRepository: ISpecificationsRepository
    ) {}
 
    async execute({car_id, specifications_ids}:IRequest) : Promise<Car>{

        const exists = await this.carsRepository.findById(car_id)
        
        if(!exists) throw new AppError("Car does not exists!")

        const specification = await this.spscificationsRepository.findByIds(specifications_ids)
        exists.specification = specification

        return exists
    }

}

export { CreateCarsSpecificationUseCase }