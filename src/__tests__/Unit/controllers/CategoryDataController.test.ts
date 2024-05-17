import { CategoryDataController } from './../../../controllers/CategoryDataController';
import { CategoryDataService } from './../../../services/CategoryDataService';
import { CategoryDataRepository } from '../../../Repository/CategoryDataRepository';
import { HttpStatusCode } from '../../../data/HttpStatusCode';
import { SendResponse } from '../../../implementations/SendResponse';
import { SendNext } from '../../../implementations/SendNext';

jest.mock('../../../Repository/CategoryDataRepository');
jest.mock('../../../services/CategoryDataService');
jest.mock('../../../features/HelperFeature');

describe('SearchContentController', () => {
  let controller: CategoryDataController;
  let mockService: CategoryDataService;
  let mockRepository: CategoryDataRepository;
  let sendResponse: SendResponse;
  let sendNext: SendNext;

  beforeEach(() => {
    mockRepository = new CategoryDataRepository();
    mockService = new CategoryDataService(mockRepository) as jest.Mocked<CategoryDataService>;
    sendNext = new SendNext();
    sendResponse = new SendResponse();
    controller = new CategoryDataController(mockService);
  });

  describe('searchContent', () => {
    it('should return category data and status code 200 on success', async () => {
      const mockCategoryData = {
        "subcategories": [
            {
                "num_cat": "sampleNum",
                "nom_cat": "Sample Category",
                "image": "image.jpg"
            },
        ],
        "services": [
            {
                num_cat: 'sampleNum',
                nom_cat: 'Sample Category',
                image: 'image.jpg'
            }
        ]
    };

      jest.spyOn(mockService, 'getCategoryData').mockResolvedValue(mockCategoryData);
      jest.spyOn(sendResponse, 'send').mockReturnValue();

      await controller.getCategoryData("test", sendResponse, sendNext);

      expect(sendResponse.send).toHaveBeenCalledWith(HttpStatusCode.statutOk, mockCategoryData);
    });

    it('should call sendNext on error', async () => {
      const error = new Error('Test error');

      jest.spyOn(mockService, 'getCategoryData').mockRejectedValue(error);
      jest.spyOn(sendNext, 'send').mockReturnValue();

      await controller.getCategoryData("test", sendResponse, sendNext);

      expect(sendNext.send).toHaveBeenCalledWith(error);
    });
  });
});