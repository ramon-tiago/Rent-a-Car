import { Router } from "express";
import multer from "multer";

import uploadConf from "@config/upload"
import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ListCarController } from "@modules/cars/useCases/listCars/ListCarController";
import { CreateCarsSpecificationController } from "@modules/cars/useCases/createCarsSpecification/CreateCarsSpecificationController";

const carsRoutes = Router()

const uploadAvatar = multer(uploadConf.upload("./tmp/cars"))

const createCarController = new CreateCarController()
const createCarsSpecificationController = new CreateCarsSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const listCarController = new ListCarController()

carsRoutes.post("/",  ensureAdmin, createCarController.handle)
carsRoutes.get("/", listCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", createCarsSpecificationController.handle)
// carsRoutes.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { carsRoutes }

