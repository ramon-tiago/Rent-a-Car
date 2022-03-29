import { Category } from "@entities/Category";
import { Specification } from "@entities/Specification";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specification: Specification[] = []
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specification = await this.specification.filter(spe => ids.includes(spe.id))

        return specification
    }
    async findByName(name: string): Promise<Specification> {
        const Specification = this.specification.find((c) => c.name === name);
        return Specification
    }
    async list(): Promise<Specification[]> {
        const all = this.specification;
        return all
    }
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name, description
        })
        this.specification.push(specification)
        return specification
    }

}

export {SpecificationRepositoryInMemory}