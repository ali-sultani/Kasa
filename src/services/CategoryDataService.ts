import { CategoryDataRepository } from '../Repository/CategoryDataRepository';
import { InternalServerError } from '../errors/InternalServerError';
import { CategoryMapper } from '../mappers/CategoryMapper';
import { ServiceMapper } from '../mappers/ServiceMapper';

export class CategoryDataService {

    constructor(private repository: CategoryDataRepository) {
    }

    public async getCategoryData(numCategorie: string): Promise<any> {
        try {
          const [subcategories, services] = await Promise.all([
            this.repository.findSubCategoriesByCategory(numCategorie),
            this.repository.findServicesByCategory(numCategorie),
          ]);
      
          const subcategoryData = await Promise.all(subcategories.map(async (category) => {
            const { numParentCategorie, ...mappedCategory } = await CategoryMapper.mapToCategoryResponse(category);
            return mappedCategory;
          }));      

          const serviceData = services.map((service) => {
            const { numCategorie, ...mappedService } = ServiceMapper.mapToServiceResponse(service);
            return mappedService;
          });

          return {
            subcategories: subcategoryData,
            services: serviceData,
          };
        } catch (err: any) {
          throw new InternalServerError(err);
        }
      }
}
