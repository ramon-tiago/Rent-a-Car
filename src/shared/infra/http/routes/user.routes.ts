import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCase/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";
import uploadConf from "@config/upload"

const userRoutes = Router()

const uploadAvatar = multer(uploadConf.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle)
userRoutes.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle)
// userRoutes.get("", listSpecificationsController.handle)

export { userRoutes }

