import { HomePageService } from '../../../services/HomePageService';
import { HomePageRepository } from '../../../Repository/HomePageRepository';
import { Specification } from '../../../data/Specification';

jest.mock('../../../Repository/HomePageRepository');

describe('HomePageService tests', () => {
  let service: HomePageService;
  let mockRepository: HomePageRepository;

  beforeEach(() => {
    mockRepository = new HomePageRepository() as jest.Mocked<HomePageRepository>;
    service = new HomePageService(mockRepository);
  });

  describe('getHomePageData tests', () => {
    it('should return an object with categories, popularServices, and recommendedServices', async () => {
      const mockCategories = [{ numCategorie: '1', numParentCategorie: null, nomCategorie: 'Category 1', image: 'image1' }];
      const mockServices = [
        { numService: '1', numCategorie: '1', nomService: 'Service 1', demandeServiceCount: 5, image: 'image1' },
        { numService: '2', numCategorie: '1', nomService: 'Service 2', demandeServiceCount: 10, image: 'image2' },
      ];

      jest.spyOn(mockRepository, 'getAllCategories').mockResolvedValue(mockCategories);
      jest.spyOn(mockRepository, 'getAllServicesWithDemandeServiceCount').mockResolvedValue(mockServices);

      const result = await service.getHomePageData();

      expect(result).toEqual({
        categories: mockCategories,
        popularServices: mockServices.slice(0, 3),
        recommendedServices: expect.any(Array),
      });
    });

    it('should handle errors and throw an error', async () => {
      jest.spyOn(mockRepository, 'getAllCategories').mockRejectedValue(new Error('Database error'));
      jest.spyOn(mockRepository, 'getAllServicesWithDemandeServiceCount').mockResolvedValue([]);

      await expect(service.getHomePageData()).rejects.toThrow(Error);
    });
  });

  describe('getPopularServices tests', () => {
    it('should return the top N popular services by demandeServiceCount', () => {
      const services = [
        { numService: '1', numCategorie: '1', nomService: 'Service 1', demandeServiceCount: 5, image: 'image1' },
        { numService: '2', numCategorie: '1', nomService: 'Service 2', demandeServiceCount: 10, image: 'image2' },
        { numService: '3', numCategorie: '1', nomService: 'Service 3', demandeServiceCount: 2, image: 'image3' },
      ];

      const result = service['getPopularServices'](services);
      const expectedSlice = services.slice(0, Specification.nombreDeServicePopulaire);

      expect(result).toEqual(expectedSlice);
    });
  });

  describe('getRecommendedServices tests', () => {
    it('should return an array of recommended services based on the temporary logic', () => {
      const services = [
        { numService: '1', numCategorie: '1', nomService: 'Livrer un colis', demandeServiceCount: 5, image: 'image1' },
        { numService: '2', numCategorie: '1', nomService: 'Maquilleur/Maquilleuse', demandeServiceCount: 10, image: 'image2' },
        { numService: '3', numCategorie: '1', nomService: 'Coaching sportif personnel', demandeServiceCount: 2, image: 'image3' },
        { numService: '4', numCategorie: '1', nomService: 'Promenade de chien', demandeServiceCount: 8, image: 'image4' },
        { numService: '5', numCategorie: '1', nomService: 'Other Service', demandeServiceCount: 3, image: 'image5' },
      ];

      const result = service['getRecommendedServices'](services);

      expect(result).toEqual([
        { numService: '1', numCategorie: '1', nomService: 'Livrer un colis', demandeServiceCount: 5, image: 'image1' },
        { numService: '2', numCategorie: '1', nomService: 'Maquilleur/Maquilleuse', demandeServiceCount: 10, image: 'image2' },
        { numService: '3', numCategorie: '1', nomService: 'Coaching sportif personnel', demandeServiceCount: 2, image: 'image3' },
        { numService: '4', numCategorie: '1', nomService: 'Promenade de chien', demandeServiceCount: 8, image: 'image4' },
      ]);
    });
  });
});