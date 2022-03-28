import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository ";
import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRespository: ICarsRepository
    ) {}
    async execute({name, description, daily_rate, license_plate, fine_amount, brand, category_id}:IRequest): Promise<Car>{
        const carAlreadyExists = await this.carsRespository.findByLicense_plate(license_plate)

        if(carAlreadyExists) {
            throw new AppError('Car Already exists',400)
        }
        const car = await this.carsRespository.create({
            name, description, daily_rate, 
            license_plate, fine_amount, 
            brand, category_id
        })
        return car
    }

}

export { CreateCarUseCase }