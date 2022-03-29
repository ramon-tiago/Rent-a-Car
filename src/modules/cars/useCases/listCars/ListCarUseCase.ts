import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository ";
import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class ListCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRespository: ICarsRepository
    ) {}
    async execute(): Promise<Car[]>{
        const car = await this.carsRespository.findAllCars()
        return car
    }

}

export { ListCarUseCase }