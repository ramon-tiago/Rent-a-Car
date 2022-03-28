import { Category } from "@entities/Category";
import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

// DTO => Data Transfer Object

interface ICarsRepository  {
    // findByName(name: string );
    // list(): Promise<Cars[]>;
    create(data:ICreateCarsDTO ): Promise<Car>;
    findByLicense_plate(license_plate: string): Promise<Car>;
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>
    findById(car_id: string): Promise<Car>;
}

export { ICarsRepository }