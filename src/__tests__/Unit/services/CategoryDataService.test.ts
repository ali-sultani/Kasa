import { CategoryDataService } from '../../../services/CategoryDataService';
import { CategoryDataRepository } from '../../../Repository/CategoryDataRepository';
import { awsBucket, converter } from "../../../features/HelperFeature";
import { Service } from '../../../models/TableModels/ServiceTable';
import { Categorie } from '../../../models/TableModels/CategorieTable';

jest.mock('../../../Repository/SearchContentRepository');

describe('CategoryDataService tests', () => {
  let service: CategoryDataService;
  let mockRepository: CategoryDataRepository;

  beforeEach(() => {
    mockRepository = new CategoryDataRepository() as jest.Mocked<CategoryDataRepository>;
    service = new CategoryDataService(mockRepository);
  });

  describe('categoryDataService tests', () => {
    it('should return a list of subcategories and services ', async () => {

      const mockServices = [
        Service.build({
          num_service: Buffer.from('1'), 
          num_categorie: Buffer.from('2'), 
          nom_service: 'Sample Service',
          image: 'image1.jpg',
          demandeServices: [], 
          categorie: {
            num_categorie: Buffer.from('1'),
          },
        }),
      ];

      const mockCategories = [
        Categorie.build({
          num_categorie: Buffer.from('1'),
          nom_categorie: 'Sample Category',
          image: 'image2.jpg',
          services: [],
        }),
      ];
        
        jest.spyOn(awsBucket, 'getPublicObjectUrl').mockReturnValue('image.jpg');
        jest.spyOn(converter, 'convertBinaryToUuid').mockReturnValue('sampleNum');
        jest.spyOn(mockRepository, 'findServicesByCategory').mockResolvedValue(mockServices);
        jest.spyOn(mockRepository, 'findSubCategoriesByCategory').mockResolvedValue(mockCategories);

      const result = await service.getCategoryData("test");

      expect(result).toEqual(
        {
            "subcategories": [
                {
                    numCategorie: "sampleNum",
                    nomCategorie: "Sample Category",
                    image: "image.jpg"
                },
            ],
            "services": [
                {
                    numService: 'sampleNum',
                    nomService: 'Sample Service',
                    image: 'image.jpg'
                }
            ]
        }
      );
    });

    it('should handle errors and throw an error', async () => {
        jest.spyOn(mockRepository, 'findServicesByCategory').mockRejectedValue(new Error('Database error'));
        jest.spyOn(mockRepository, 'findSubCategoriesByCategory').mockRejectedValue(new Error('Database error'));
        await expect(service.getCategoryData('test')).rejects.toThrow(Error);
    });
  });
});