import { Category } from "@entities/Category";
import { Specification } from "@entities/Specification";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specification: Specification[] = []

    async findByName(name: string) {
        const Specification = this.specification.find((c) => c.name === name);
        return Specification
    }
    async list(): Promise<Specification[]> {
        const all = this.specification;
        return all
    }
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            name, description
        })
        this.specification.push(specification)
    }

}

export {SpecificationRepositoryInMemory}