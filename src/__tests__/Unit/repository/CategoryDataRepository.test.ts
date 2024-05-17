import { CategoryDataRepository } from "../../../Repository/CategoryDataRepository";
import { InternalServerError } from "../../../errors/InternalServerError";
import { Categorie } from "../../../models/TableModels/CategorieTable";
import { Service } from "../../../models/TableModels/ServiceTable";

describe('CategoryDataRepository tests', () => {
  let repository: CategoryDataRepository;

  beforeEach(() => {
    repository = new CategoryDataRepository();
  });

  describe('findServicesByCategory tests', () => {
    it('should return an array of service', async () => {
      const mockService = { 
        num_service: 'sampleNum',
        num_categorie: 'sampleNum',
        nom_service: 'Sample Service',
        image: 'sampleImage' 
      };
      
      jest.spyOn(Service, 'findAll').mockResolvedValue([mockService as any]);
    
      const result = await repository.findServicesByCategory("test");
    
      expect(result).toEqual([
        {
            num_service: 'sampleNum', num_categorie: 'sampleNum', nom_service: 'Sample Service', image: 'sampleImage'
        }]);
    });
    

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Service, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.findServicesByCategory("test")).rejects.toThrow(InternalServerError);
    });
  });

  describe('findAllByNomCategorie tests', () => {
    it('should return an array of Categories', async () => {
      const mockCategory = {
        num_cat: 'sampleNum',
        nom_cat: 'Sample Category',
        image: 'sampleImage'
      };

      jest.spyOn(Categorie, 'findAll').mockResolvedValue([mockCategory as any]);

      const result = await repository.findSubCategoriesByCategory("test");

      expect(result).toEqual([
        {
            num_cat: 'sampleNum',
            nom_cat: 'Sample Category',
            image: 'sampleImage'
        },
      ]);
    });

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Categorie, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.findSubCategoriesByCategory("test")).rejects.toThrow(InternalServerError);
    });
  });
});