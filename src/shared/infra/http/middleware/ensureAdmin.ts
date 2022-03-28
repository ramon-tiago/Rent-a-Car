import { NextFunction, Request, Response } from "express"
import { AppError } from "@errors/AppError";
import { joker } from "@joker";


async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(joker)
        if (!joker.user.admin) {
            console.log('chegou aqui??')
            throw new AppError("User is not admin", 401)
        }
        return next()
    }catch(err) {
        throw new AppError("User is not admin", 401)
    }
}

export { ensureAdmin }