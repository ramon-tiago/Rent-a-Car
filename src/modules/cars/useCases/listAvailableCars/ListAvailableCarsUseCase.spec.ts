import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "../createCars/CreateCarUseCase"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase

describe("List Cars", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("Should be able to list avaiable cars", async () => {

        const car = await createCarUseCase.execute({
            "name": "Corola",
            "description": " Criar carros populares caros",
            "daily_rate": 150,
            "license_plate": "ABC1235",
            "fine_amount": 100,
            "brand": "Toyota",
            "category_id": "9edf99bc-b9de-413f-95aa-a2254ed552b3"
        })

        const carII = await createCarUseCase.execute({
            "name": "Corola",
            "description": " Criar carros populares caros",
            "daily_rate": 150,
            "license_plate": "ABC1236",
            "fine_amount": 100,
            "brand": "Toyota",
            "category_id": "9edf99bc-b9de-413f-95aa-a2254ed552b3"
        })

        const list = await  listCarsUseCase.execute({
            brand: "Toyota"
        })
        
        expect(list).toEqual([car, carII])
    })

    it("Shold be able to list all available cars by name", async() => {
        const car = await createCarUseCase.execute({
            "name": "Corola",
            "description": " Criar carros populares caros",
            "daily_rate": 150,
            "license_plate": "ABC1235",
            "fine_amount": 100,
            "brand": "Toyota",
            "category_id": "9edf99bc-b9de-413f-95aa-a2254ed552b3"
        })


        const list = await  listCarsUseCase.execute({
            name: "Corola"
        })
        
        expect(list).toEqual([car])
    })
})