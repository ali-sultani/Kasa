import { SearchContentService } from '../../../services/SearchContentService';
import { SearchContentRepository } from '../../../Repository/SearchContentRepository';
import { Service } from '../../../models/TableModels/ServiceTable';
import { awsBucket, converter } from "../../../features/HelperFeature";

jest.mock('../../../Repository/SearchContentRepository');

describe('HomePageService tests', () => {
  let service: SearchContentService;
  let mockRepository: SearchContentRepository;

  beforeEach(() => {
    mockRepository = new SearchContentRepository() as jest.Mocked<SearchContentRepository>;
    service = new SearchContentService(mockRepository);
  });

  describe('searchContent tests', () => {
    it('should return a list of an object containning numService, nomService and image ', async () => {

        const mockServices = [
            Service.build({
              num_service: Buffer.from('1'), 
              num_categorie: Buffer.from('2'), 
              nom_service: 'Service 1',
              image: 'image1.jpg',
              demandeServices: [], 
              categorie: {
                num_categorie: Buffer.from('1'),
                // Other properties of the associated Categorie
              },
            }),
            Service.build({
              num_service: Buffer.from('2'), 
              num_categorie: Buffer.from('2'), 
              nom_service: 'Service 2',
              image: 'image2.jpg',
              demandeServices: [], 
              categorie: {
                num_categorie: Buffer.from('2'),
                // Other properties of the associated Categorie
              },
            }),
          ];
        
        jest.spyOn(awsBucket, 'getPublicObjectUrl').mockReturnValue('image.jpg');
        jest.spyOn(converter, 'convertBinaryToUuid').mockReturnValue('sampleNum');
        jest.spyOn(mockRepository, 'findAllByNomService').mockResolvedValue(mockServices.slice(0, 1));
        jest.spyOn(mockRepository, 'findAllByNomCategorie').mockResolvedValue(mockServices.slice(1, 2));

      const result = await service.searchContent("test");

      expect(result).toEqual(
        [{
            numService: 'sampleNum',
            nomService: 'Service 1',
            image: 'image.jpg',
          },
          {
            numService: 'sampleNum',
            nomService: 'Service 2',
            image: 'image.jpg',
          }
        ]
      );
    });

    it('should handle errors and throw an error', async () => {
        jest.spyOn(mockRepository, 'findAllByNomService').mockRejectedValue(new Error('Database error'));
        jest.spyOn(mockRepository, 'findAllByNomCategorie').mockRejectedValue(new Error('Database error'));
        await expect(service.searchContent('test')).rejects.toThrow(Error);
    });
  });
});