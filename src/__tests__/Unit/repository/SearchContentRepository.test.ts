import { SearchContentRepository } from "../../../Repository/SearchContentRepository";
import { InternalServerError } from "../../../errors/InternalServerError";
import { awsBucket, converter } from "../../../features/HelperFeature";
import { Categorie } from "../../../models/TableModels/CategorieTable";
import { Service } from "../../../models/TableModels/ServiceTable";

describe('SearchContentRepository tests', () => {
  let repository: SearchContentRepository;

  beforeEach(() => {
    repository = new SearchContentRepository();
  });

  describe('findAllByNomService tests', () => {
    it('should return an array of service', async () => {
      const mockService = { 
        num_service: 'sampleNum',
        num_categorie: 'sampleNum',
        nom_service: 'Sample Service',
        image: 'sampleImage' 
      };
      
      jest.spyOn(Service, 'findAll').mockResolvedValue([mockService as any]);
    
      const result = await repository.findAllByNomService("test");
    
      expect(result).toEqual([
        {
            num_service: 'sampleNum', num_categorie: 'sampleNum', nom_service: 'Sample Service', image: 'sampleImage'
        }]);
    });
    

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Service, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.findAllByNomService("test")).rejects.toThrow(InternalServerError);
    });
  });

  describe('findAllByNomCategorie tests', () => {
    it('should return an array of Service', async () => {
      const mockService = {
        num_service: 'sampleNum',
        num_categorie: 'sampleNum',
        nom_service: 'Sample Service',
        image: 'sampleImage'
      };

      jest.spyOn(Service, 'findAll').mockResolvedValue([mockService as any]);

      const result = await repository.findAllByNomCategorie("test");

      expect(result).toEqual([
        {
          num_service: 'sampleNum',
          num_categorie: 'sampleNum',
          nom_service: 'Sample Service',
          image: 'sampleImage',
        },
      ]);
    });

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Service, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.findAllByNomCategorie("test")).rejects.toThrow(InternalServerError);
    });
  });
});