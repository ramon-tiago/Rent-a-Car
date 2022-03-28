import { Router } from "express";
import multer from "multer";

import uploadConf from "@config/upload"
import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router()

const uploadAvatar = multer(uploadConf.upload("./tmp/cars"))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/",  ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
// carsRoutes.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { carsRoutes }

