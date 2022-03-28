import { ICategoriesRepository } from "../../repository/ICategoriesRepository";
import fs from "fs";
import csv from "csv-parser";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
        ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csv();
            stream.pipe(parseFile)

            parseFile.on("data", async (line) => {
                
                console.log(line, 'line')
                const { name, description } =line
                
                console.log(name, description, 'name and description')
                categories.push({ name, description})   
            })
            .on("end", () => {
                fs.promises.unlink(file.path)
                resolve(categories);
            })
            .on("error", (err) => {
                fs.promises.unlink(file.path)
                reject(err);
            });
        }) 
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file)
        const categoryExists:IImportCategory[] = []

        categories.map(async (cat) => {
            const  {name, description} = cat
            const exixtCategory = await this.categoriesRepository.findByName(name)
            if (exixtCategory) {
                categoryExists.push({
                    name, description
                })
            }else {
                await this.categoriesRepository.create({name, description});
            }
        })

        // await this.categoriesRepository.create(line)
    }

}

export { ImportCategoryUseCase }