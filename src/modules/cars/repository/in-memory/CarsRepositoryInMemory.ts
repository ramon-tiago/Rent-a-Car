import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "../ICarsRepository ";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { Category } from "@entities/Category";

class CarsRepositoryInMemory implements ICarsRepository {
    
    cars: Car[] = []

    async create({
        name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarsDTO): Promise<Car> {
        const car = new Car();
        
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        })
        await this.cars.push(car)  
        return car
    }

    async findByLicense_plate(license_plate: string): Promise<Car> {
        return await this.cars.find((c) => c.license_plate === license_plate)
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        return this.cars.filter((car) => {
            if(
                car.available === true 
                || (brand && car.brand === brand)
                || (category_id && car.category_id === category_id)
                || (name && car.name === name)
            ) {
                return car
            }
            return null 
        })

        // return this.cars.filter((car) => car.available === true)
        // .filter((car) => (brand && car.brand === brand)
        // || (category_id && car.category_id === category_id)
        // || (name && car.name === name))
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find(c => c.id === car_id)
    }  
}

export {CarsRepositoryInMemory}