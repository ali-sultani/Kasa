import { SearchContentController } from './../../../controllers/SearchContentController';
import { SearchContentService } from './../../../services/SearchContentService';
import { SearchContentRepository } from '../../../Repository/SearchContentRepository';
import { HttpStatusCode } from '../../../data/HttpStatusCode';
import { SendResponse } from '../../../implementations/SendResponse';
import { SendNext } from '../../../implementations/SendNext';
import { send } from 'process';

jest.mock('../../../Repository/SearchContentRepository');
jest.mock('../../../services/SearchContentService');
jest.mock('../../../features/HelperFeature');

describe('SearchContentController', () => {
  let controller: SearchContentController;
  let mockService: SearchContentService;
  let mockRepository: SearchContentRepository;
  let sendResponse: SendResponse;
  let sendNext: SendNext;

  beforeEach(() => {
    sendResponse = new SendResponse();
    sendNext = new SendNext();
    mockRepository = new SearchContentRepository();
    mockService = new SearchContentService(mockRepository) as jest.Mocked<SearchContentService>;
    controller = new SearchContentController(mockService);
  });

  describe('searchContent', () => {
    it('should return search content data and status code 200 on success', async () => {
      const mockSearchContentData = [{
        "numService": "",
        "nomService": "",
        "image": ""
        }];

      jest.spyOn(mockService, 'searchContent').mockResolvedValue(mockSearchContentData);
      jest.spyOn(sendResponse, 'send').mockReturnValue();

      await controller.searchContent("test", sendResponse, sendNext);

      expect(sendResponse.send).toHaveBeenCalledWith(HttpStatusCode.statutOk, mockSearchContentData);
    });

    it('should call sendNext on error', async () => {
      const error = new Error('Test error');

      jest.spyOn(mockService, 'searchContent').mockRejectedValue(error);
      jest.spyOn(sendNext, 'send').mockReturnValue();

      await controller.searchContent("test", sendResponse, sendNext);

      expect(sendNext.send).toHaveBeenCalledWith(error);
    });
  });
});