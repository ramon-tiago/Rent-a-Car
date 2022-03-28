
import { AppError } from "@errors/AppError";
import { CategoryRepositoryInMemory } from "../../repository/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


describe("Create Category", () => {
    let createCategoryUseCase: CreateCategoryUseCase
    let categoriesRepositoryInMemory: CategoryRepositoryInMemory
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("Shold be able to create a new category", async () => {
        const newCategory = {
            name: "Category Test", 
            description: "Category description Test"
        }
        await createCategoryUseCase.execute(newCategory)
        const category = await categoriesRepositoryInMemory.findByName(newCategory.name)

        console.log(category)
        expect(category).toHaveProperty("id")
    })

    it("Shold not be able to create a new category with name exists", async () => {
        expect(async () => {
            const newCategory = {
                name: "Category Test", 
                description: "Category description Test"
            }
            await createCategoryUseCase.execute(newCategory)
            await createCategoryUseCase.execute(newCategory)
        }).rejects.toBeInstanceOf(AppError)

    })
})

