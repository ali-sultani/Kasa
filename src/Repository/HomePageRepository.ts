import { InternalServerError } from "../errors/InternalServerError";
import { Categorie } from "../models/TableModels/CategorieTable";
import { CategoryResponse } from "../models/ApiResponse/CategoryResponse";
import { Service } from "../models/TableModels/ServiceTable";
import { DemandeDeService } from "../models/TableModels/DemandeDeServiceTable";
import { Sequelize } from "sequelize-typescript";
import { ServiceWithCountResponse } from "../models/ApiResponse/ServiceWithCountResponse";
import { CategoryMapper } from "../mappers/CategoryMapper";
import { ServiceMapper } from "../mappers/ServiceMapper";

export class HomePageRepository {
  constructor() {}

  public async getAllCategories(): Promise<CategoryResponse[]> {
    try {
      const categories = await Categorie.findAll();
      return CategoryMapper.mapArrayToCategoryResponses(categories);
    }
    catch (err: any) {
      throw new InternalServerError(err);
    }
  };

  public async getAllServicesWithDemandeServiceCount(): Promise<ServiceWithCountResponse[]> {
    try {
      const services = await Service.findAll({
        attributes: [
          'num_service',
          'num_categorie',
          'nom_service',
          'image',
          [
            Sequelize.literal('(SELECT COUNT(*) FROM demande_service WHERE num_service = Service.num_service)'),
            'demandeServiceCount',
          ],
        ],
        include: [{
          model: DemandeDeService,
          attributes: [],
          duplicating: false,
        }],
        group: [
          'Service.num_service', 
          'Service.num_categorie', 
          'Service.nom_service', 
          'Service.image',
        ],
      });

      return ServiceMapper.mapArrayToServiceWithCountResponses(services);
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}