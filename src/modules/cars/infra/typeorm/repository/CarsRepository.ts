import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository ";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>
    constructor (){
        this.repository = getRepository(Car);
    }
    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id)
        return car
    }
    findAllCars(): Promise<Car[]> {
        const cars = this.repository.find();
        return cars
    }

    async create(data: ICreateCarsDTO): Promise<Car> {
        const { name, brand, category_id,daily_rate,description,fine_amount,license_plate, specifications, id} = data

        const car = this.repository.create(data)

        await this.repository.save(car)

        return car
    }

    async findByLicense_plate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({license_plate})

        return car
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true})
        if(brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        }
        
        if(name) {
            carsQuery.andWhere("c.name = :name", { name })
        }
        
        if(category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }
        const cars = await carsQuery.getMany();

        return cars
    }
}

export { CarsRepository }