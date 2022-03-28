import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { UserRespository } from "@modules/accounts/repository/implementatios/UserRespository";
import { AppError } from "@errors/AppError";
import { joker } from "@joker";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader){
        throw new AppError("Token missing", 401);
    }
    const [, token ] = authHeader.split(" ")
    try {
        const { sub: user_id } = verify(token, "create Token Top") as IPayload;

        const userRespository = new UserRespository();
        const user = await userRespository.findById(user_id)

        if (!user) {
            throw new AppError("User does not exists!", 401)
        }

        joker.user.id = user_id
        joker.user.admin = user.admin
        // req.user = {
        //     id: user_id
        // }
        
        next()

    }catch(err) {
        throw new AppError("Invalid token", 401)
    }
}