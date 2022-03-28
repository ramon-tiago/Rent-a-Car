import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repository/implementations/CategoriesRepository"

import { ISpecificationsRepository } from "../../modules/cars/repository/ISpecificationsRepository"
import { SpecificationsRepository } from "../../modules/cars/repository/implementations/SpecificationsRepository"

import { IUserRespository } from "../../modules/accounts/repository/IUserRespository"
import { UserRespository } from "../../modules/accounts/repository/implementatios/UserRespository"

import { ICarsRepository } from "@modules/cars/repository/ICarsRepository "
import { CarsRepository } from "@modules/cars/infra/typeorm/repository/CarsRepository"


container.registerSingleton<ICategoriesRepository> (
    "CategoriesRepository", CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository> (
    "SpecificationsRepository", SpecificationsRepository
)

container.registerSingleton<IUserRespository> (
    "UserRespository", UserRespository
)

container.registerSingleton<ICarsRepository> (
    "CarsRepository", CarsRepository
)