import { inject, injectable } from "tsyringe";
import { IUserRespository } from "../../repository/IUserRespository";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@errors/AppError";

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        nome: string
        email: string
    },
    token: string
}

@injectable()
class AuthenticationUserUseCase {
    constructor(
        @inject("UserRespository")
        private repository: IUserRespository
    ) {}

    async execute({email, password }:IRequest ): Promise<IResponse> {
        const user = await this.repository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect", 401);
        }
        
        const compracaoSenha = await compare(password, user.password)
        if (!compracaoSenha) {
            throw new AppError("Email or password incorrect", 401);
        }

        const token = sign({}, "create Token Top", {
            subject: user.id,
            expiresIn: "1d"
        })

        const result:IResponse = {
            token,
            user: {
                nome: user.name,
                email: user.email,
            }
        }
        return result
    }
}

export { AuthenticationUserUseCase }