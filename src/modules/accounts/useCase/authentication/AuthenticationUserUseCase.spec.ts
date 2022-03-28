import { UserRespositoryInMemory } from "../../repository/inMemory/UserRespositoryInMemory"
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase"
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase"
import { ICreateuserDTO } from "../../dtos/ICreateUserDTO"
import { AppError } from "@errors/AppError"

describe("Authenticate User", () => {
    let authenticationUserUseCase: AuthenticationUserUseCase
    let userRespositoryInMemory: UserRespositoryInMemory
    let createUserUseCase: CreateUserUseCase
    
    beforeEach(() => {
        userRespositoryInMemory = new UserRespositoryInMemory()
        authenticationUserUseCase = new AuthenticationUserUseCase(userRespositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRespositoryInMemory);
    })
    it("Shoul be able to authenticate an user", async () =>{
        const user: ICreateuserDTO = {
            name: "Ramon",
            password: "123456", 
            email: "ramonx.tiago@hotmail.com", 
            driver_licence: "ok...", 
            admin: true
        }
        await createUserUseCase.execute(user)
        const result = await authenticationUserUseCase.execute({email: user.email, password: user.password})
        
        expect(result).toHaveProperty("token")
    })
    it("shold not be able to authenticate an nonexistent user", () => {
        expect(async () =>{
            await authenticationUserUseCase.execute({email: "user.email", password: "user.password"})

        }).rejects.toBeInstanceOf(AppError);
    })

    it("shold not be able to authenticate with incorrect password", () => {
        expect(async () =>{
            const user: ICreateuserDTO = {
                name: "Ramon",
                password: "123456", 
                email: "teste@teste.com", 
                driver_licence: "ok...", 
                admin: true
            }
            await createUserUseCase.execute(user)
            await authenticationUserUseCase.execute({email: user.email, password: "12514"})

        }).rejects.toBeInstanceOf(AppError);
    })
})