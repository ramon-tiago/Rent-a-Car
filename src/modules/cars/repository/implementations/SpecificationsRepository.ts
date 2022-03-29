import { getRepository, Repository } from "typeorm";
import { Specification } from "@entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

/**
 * singleton
 * padrão para trabalhar na mesma instância
 * isntância global na mesma aplicação.
 */

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }
  

    // private specifications: Specification[];

    // private static INSTANCE: SpecificationsRepository;

    // private constructor() {
    //     this.specifications = []
    // }

    // public static getInstance(): SpecificationsRepository {
    //     if(!SpecificationsRepository.INSTANCE ) {
    //         SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    //     }
    //     return SpecificationsRepository.INSTANCE
    // }

    async create({ description, name}: ICreateSpecificationDTO ): Promise<Specification> {

        const specification = this.repository.create({name, description})

        await this.repository.save(specification)
        // const specifications = new Specification();

        // Object.assign(specifications, {
        //     name,
        //     description,
        //     created_at: new Date(),
        // })

        // this.specifications.push(specifications)
        return specification
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find()
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({name})
        return specification;

        // const specification = this.specifications.find((s) => s.name === name)
        // return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findByIds(ids)
    }
}

export { SpecificationsRepository }