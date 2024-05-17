import { InternalServerError } from '../errors/InternalServerError';
import { Categorie } from '../models/TableModels/CategorieTable';
import { Service } from '../models/TableModels/ServiceTable';
import { Sequelize } from 'sequelize-typescript';

export class CategoryDataRepository {

    constructor() {

    }

    public async findServicesByCategory(numCat: string): Promise<Service[]> {
        try {
            return await Service.findAll({
                where: {
                    num_categorie: Sequelize.fn('UUID_TO_BIN', numCat), 
                },
            });
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    public async findSubCategoriesByCategory(numCat: string): Promise<Categorie[]> {
        try {
            // Find all subcategories with num_parent_categorie matching the subquery
            const subcategories = await Categorie.findAll({
                where: {
                    num_parent_categorie: Sequelize.fn('UUID_TO_BIN', numCat),
                },
            });
            return subcategories;
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }
}