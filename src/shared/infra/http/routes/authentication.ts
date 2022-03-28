import { Router } from "express";
import { AuthenticationUserController } from "@modules/accounts/useCase/authentication/AuthenticationUserController";


const authenticationUserController = new  AuthenticationUserController();

const authRoutes = Router();

authRoutes.post("/", authenticationUserController.handle)


export { authRoutes }