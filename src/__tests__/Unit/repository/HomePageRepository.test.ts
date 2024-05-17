import { HomePageRepository } from "../../../Repository/HomePageRepository";
import { InternalServerError } from "../../../errors/InternalServerError";
import { awsBucket, converter } from "../../../features/HelperFeature";
import { Categorie } from "../../../models/TableModels/CategorieTable";
import { Service } from "../../../models/TableModels/ServiceTable";

describe('HomePageRepository tests', () => {
  let repository: HomePageRepository;

  beforeEach(() => {
    repository = new HomePageRepository();
  });

  describe('getAllCategories tests', () => {
    it('should return an array of CategoryResponse', async () => {
      const mockCategory = { num_categorie: 'sampleNum', nom_categorie: 'Sample Category', image: 'sampleImage' };
      
      jest.spyOn(Categorie, 'findAll').mockResolvedValue([mockCategory as any]);
      jest.spyOn(awsBucket, 'getPublicObjectUrl').mockReturnValue('sampleImageUrl');
      jest.spyOn(converter, 'convertBinaryToUuid').mockReturnValue('sampleNum');
    
      const result = await repository.getAllCategories();
    
      expect(result).toEqual([
        {
          numCategorie: 'sampleNum',
          numParentCategorie: null,
          nomCategorie: 'Sample Category',
          image: 'sampleImageUrl',
        },
      ]);
    });
    

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Categorie, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.getAllCategories()).rejects.toThrow(InternalServerError);
    });
  });

  describe('getAllServicesWithDemandeServiceCount tests', () => {
    it('should return an array of ServiceWithCountResponse', async () => {
      const mockService = {
        num_service: 'sampleNum',
        num_categorie: 'sampleNum',
        nom_service: 'Sample Service',
        image: 'sampleImage',
        getDataValue: (key: string) => key === 'demandeServiceCount' ? 5 : null,
      };

      jest.spyOn(Service, 'findAll').mockResolvedValue([mockService as any]);
      jest.spyOn(awsBucket, 'getPublicObjectUrl').mockReturnValue('sampleImageUrl');
      jest.spyOn(converter, 'convertBinaryToUuid').mockReturnValue('sampleNum');

      const result = await repository.getAllServicesWithDemandeServiceCount();

      expect(result).toEqual([
        {
          numService: 'sampleNum',
          numCategorie: 'sampleNum',
          nomService: 'Sample Service',
          demandeServiceCount: 5,
          image: 'sampleImageUrl',
        },
      ]);
    });

    it('should handle errors and throw InternalServerError', async () => {
      jest.spyOn(Service, 'findAll').mockRejectedValue(new Error('Database error'));

      await expect(repository.getAllServicesWithDemandeServiceCount()).rejects.toThrow(InternalServerError);
    });
  });
});