import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repository/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@utils/errors/AppError";
import { CreateCarUseCase } from "../createCars/CreateCarUseCase";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";


let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarsSpecification: CreateCarsSpecificationUseCase;

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car specification", () => {
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarsSpecification = new CreateCarsSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
    });

    it("should not be able to add a new specification to the car", async () => {
        expect(async() => {
            const car_id = "123456"
            const specifications_ids = ["654321"]
            await createCarsSpecification.execute({car_id, specifications_ids})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMemory.create
        ({
            name: "Nome Car;",
            description: "Car top;",
            daily_rate: 100,
            license_plate: "mais que top;",
            fine_amount: 100,
            brand: "não sei...;",
            category_id: "75960268-9c74-47f4-9084-1c7f2fedca25",
        });

        const newSpecification = {
            name: "carss",
            description: "top demais"
        }
        const newSpecification2 = {
            name: "carss",
            description: "top demais"
        }

        const specification = await specificationRepositoryInMemory.create(newSpecification)
        const specification2 = await specificationRepositoryInMemory.create(newSpecification2)
        const specifications_ids= [specification.id, specification2.id]

        const verResult = await createCarsSpecification.execute({car_id: car.id, specifications_ids })

        expect(verResult).toHaveProperty("specification")
        expect(verResult.specification.length).toBe(2)

    })

})