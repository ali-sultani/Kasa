import { HomePageController } from '../../../controllers/HomePageController';
import { HomePageService } from '../../../services/HomePageService';
import { HttpStatusCode } from '../../../data/HttpStatusCode';
import { HomePageRepository } from '../../../Repository/HomePageRepository';
import { SendResponse } from '../../../implementations/SendResponse';
import { SendNext } from '../../../implementations/SendNext';

jest.mock('../../../Repository/HomePageRepository');
jest.mock('../../../services/HomePageService');
jest.mock('../../../features/HelperFeature');

describe('HomePageController', () => {
  let controller: HomePageController;
  let mockService: HomePageService;
  let mockRepository: HomePageRepository;
  let sendResponse: SendResponse;
  let sendNext: SendNext;

  beforeEach(() => {
    mockRepository = new HomePageRepository();
    mockService = new HomePageService(mockRepository) as jest.Mocked<HomePageService>;
    controller = new HomePageController(mockService);
    sendResponse = new SendResponse();
    sendNext = new SendNext();
  });

  describe('getHomePageData', () => {
    it('should return home page data and status code 200 on success', async () => {
      const mockHomePageData = { categories: [], popularServices: [], recommendedServices: [] };

      jest.spyOn(mockService, 'getHomePageData').mockResolvedValue(mockHomePageData);
      jest.spyOn(sendResponse, 'send').mockReturnValue();

      await controller.getHomePageData(sendResponse, sendNext);

      expect(sendResponse.send).toHaveBeenCalledWith(HttpStatusCode.statutOk, mockHomePageData);
    });

    it('should call sendNext on error', async () => {
      const error = new Error('Test error');

      jest.spyOn(mockService, 'getHomePageData').mockRejectedValue(error);
      jest.spyOn(sendNext, 'send').mockReturnValue();

      await controller.getHomePageData(sendResponse, sendNext);

      expect(sendNext.send).toHaveBeenCalledWith(error);
    });
  });
});