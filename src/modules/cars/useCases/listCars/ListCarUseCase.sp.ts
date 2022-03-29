import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory";
import { AppError } from "@utils/errors/AppError";
import { CreateCarUseCase } from "../createCars/CreateCarUseCase";
import { ListCarUseCase } from "./ListCarUseCase"

let carsRespository: CarsRepositoryInMemory;
let listCarUseCase: ListCarUseCase;
let createCarUseCase: CreateCarUseCase;

describe("List All the Cars", () => {
    beforeEach(()=> {
        carsRespository = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRespository)
    })

    it("Should be able to create a new car", async () => {
        
        const car = await createCarUseCase.execute({
            name: "Nome Car;",
            description: "Car top;",
            daily_rate: 100,
            license_plate: "mais que top;",
            fine_amount: 100,
            brand: "não sei...;",
            category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
        });
        expect(car.available).toBe(true)
    })
    it("Should not be able to create a new car with exists license place", async () => {
        
        expect(async () => {
            await createCarUseCase.execute({
                name: "Nome Car;",
                description: "Car top;",
                daily_rate: 100,
                license_plate: "mais que top;",
                fine_amount: 100,
                brand: "não sei...;",
                category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
            });
            
            await createCarUseCase.execute({
                name: "Nome Car;",
                description: "Car top;",
                daily_rate: 100,
                license_plate: "mais que top;",
                fine_amount: 100,
                brand: "não sei...;",
                category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should be able to create a car with available true by default", async () => {
        
        const car = await createCarUseCase.execute({
            name: "Nome Car;",
            description: "Car top;",
            daily_rate: 100,
            license_plate: "mais que top;",
            fine_amount: 100,
            brand: "não sei...;",
            category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
        });
        expect(car.available).toBe(true)
    })

    it("Should be able to create a car with available true by default", async () => {
        
        const car = await createCarUseCase.execute({
            name: "Nome Car;",
            description: "Car top;",
            daily_rate: 100,
            license_plate: "mais que top;",
            fine_amount: 100,
            brand: "não sei...;",
            category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
        });
        expect(car).toHaveProperty("id")
    })

})

