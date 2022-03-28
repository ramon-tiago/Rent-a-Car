import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory";
import { AppError } from "@utils/errors/AppError";
import { CreateCarUseCase } from "../createCars/CreateCarUseCase";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";


let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarsSpecification: CreateCarsSpecificationUseCase;

let createCarUseCase: CreateCarUseCase;

describe("Create Car specification", () => {
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        createCarsSpecification = new CreateCarsSpecificationUseCase(carsRepositoryInMemory);
    });

    it("should not be able to add a new specification to the car", async () => {
        expect(async() => {
            const car_id = "123456"
            const specification = ["654321"]
            await createCarsSpecification.execute({car_id, specification})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to the car", async () => {

        const car = await createCarUseCase.execute({
            name: "Nome Car;",
            description: "Car top;",
            daily_rate: 100,
            license_plate: "mais que top;",
            fine_amount: 100,
            brand: "não sei...;",
            category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
        });

        const specification = ["654321"]
        await createCarsSpecification.execute({car_id: car.id, specification})
    })

})