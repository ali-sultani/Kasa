import { HttpStatusCode } from '../../../data/HttpStatusCode';
import { ServiceDetailsController } from '../../../controllers/ServiceDetailsController';
import { ServiceDetailsService } from '../../../services/ServiceDetailsService';
import { ServiceDetailsRepository } from '../../../Repository/ServiceDetailsRepository';
import { AgendaService } from '../../../services/AgendaService';
import { ServiceCommentRepository } from '../../../Repository/ServiceCommentRepository';
import { AuthentificationService } from '../../../services/AuthentificationService';
import { SendResponse } from '../../../implementations/SendResponse';
import { SendNext } from '../../../implementations/SendNext';
import { send } from 'process';

jest.mock('../../../Repository/HomePageRepository');
jest.mock('../../../services/HomePageService');
jest.mock('../../../features/HelperFeature');

describe('ServiceDetailsController tests', () => {
  let agendaService: AgendaService;
  let authentificationService: AuthentificationService;
  let controller: ServiceDetailsController;
  let mockService: ServiceDetailsService;
  let mockRepository: ServiceDetailsRepository;
  let mockServiceCommentRepository: ServiceCommentRepository;
  let sendResponse: SendResponse;
  let sendNext: SendNext;

  beforeEach(() => {
    agendaService = new AgendaService();
    authentificationService = new AuthentificationService();
    mockRepository = new ServiceDetailsRepository();
    mockServiceCommentRepository = new ServiceCommentRepository();
    sendResponse = new SendResponse();
    sendNext = new SendNext();
    mockService = new ServiceDetailsService(agendaService, authentificationService, mockRepository, mockServiceCommentRepository) as jest.Mocked<ServiceDetailsService>;
    controller = new ServiceDetailsController(mockService);
  });

  describe('getServiceDetails tests', () => {
    it('should return service details data and status code 200 on success', async () => {
      const mockServiceDetails = {
        estimatedServiceDuration: 1,
        image: null,
        nomService: undefined,
        numCategorie: "service-id",
        numService: "service-id",
      };

      jest.spyOn(mockService, 'getServiceDetails').mockResolvedValue(mockServiceDetails as any);
      jest.spyOn(sendResponse, 'send').mockReturnValue();

      await controller.getServiceDetails({ id: 'service-id'} as any, sendResponse, sendNext);

      expect(sendResponse.send).toHaveBeenCalledWith(HttpStatusCode.statutOk, mockServiceDetails);
    });

    it('should call sendNext on error', async () => {
      const error = new Error('Test error');

      jest.spyOn(mockService, 'getServiceDetails').mockRejectedValue(error);
      jest.spyOn(sendNext, 'send').mockReturnValue();

      await controller.getServiceDetails({ id: 'service-id'} as any, sendResponse, sendNext);

      expect(sendNext.send).toHaveBeenCalledWith(error);
    });
  });
});