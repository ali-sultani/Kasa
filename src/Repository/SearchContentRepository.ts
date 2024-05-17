import { InternalServerError } from '../errors/InternalServerError';
import { Service } from '../models/TableModels/ServiceTable';
import { Categorie } from '../models/TableModels/CategorieTable';
import { awsBucket } from '../features/HelperFeature';
import { Op } from 'sequelize';


export class SearchContentRepository {

    constructor() {
    }

    public async findAllByNomService(nomService: string): Promise<Service[]> {

        try {
            return await Service.findAll({
                where: {
                    nom_service: {
                        [Op.like]: `%${nomService}%`
                    }
                }
            });
        }
        catch (err: any) {
            throw new InternalServerError(err);
        }

    };

    public async findAllByNomCategorie(nomCategorie: string): Promise<Service[]> {

        try {
            return await Service.findAll({
              where: {},
              include: [
                {
                  model: Categorie,
                  where: {
                    nom_categorie: {
                      [Op.like]: `%${nomCategorie}%`
                    }
                  },
                  required: true, // This enforces an INNER JOIN
                },
              ],
            });
          } catch (err: any) {
            throw new InternalServerError(err);
          }

    };
}
