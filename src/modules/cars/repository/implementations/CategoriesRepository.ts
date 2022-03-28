import { Category } from "@entities/Category"
import { getRepository, Repository } from "typeorm";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
/**
 * singleton
 * padrão para trabalhar na mesma instância
 * isntância global na mesma aplicação.
 */
class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>;
   
    constructor() {
        this.repository = getRepository(Category);
    }

    async create({name, description }: ICreateCategoryDTO ): Promise<void> {
        const category = this.repository.create({ name, description })

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories
    }

    async findByName(name:string) {
        const cate = await this.repository.findOne({name});
        return cate
    }

}

export { CategoriesRepository }