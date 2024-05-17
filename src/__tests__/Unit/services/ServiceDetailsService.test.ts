import { ServiceCommentRepository } from "../../../Repository/ServiceCommentRepository";
import { ServiceDetailsRepository } from "../../../Repository/ServiceDetailsRepository";
import { InternalServerError } from "../../../errors/InternalServerError";
import { awsBucket, converter } from "../../../features/HelperFeature";
import { AgendaService } from "../../../services/AgendaService";
import { AuthentificationService } from "../../../services/AuthentificationService";
import { ServiceDetailsService } from "../../../services/ServiceDetailsService";


describe('ServiceDetailsService', () => {
  let serviceDetailsService: ServiceDetailsService;
  let agendaService: AgendaService;
  let authentificationService: AuthentificationService;
  let serviceDetailsRepository: ServiceDetailsRepository;
  let serviceCommentRepository: ServiceCommentRepository;
  let serviceDetailsRequest: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    agendaService = new AgendaService();
    authentificationService = new AuthentificationService();
    serviceDetailsRepository = new ServiceDetailsRepository();
    serviceCommentRepository = new ServiceCommentRepository();
    serviceDetailsService = new ServiceDetailsService(agendaService, authentificationService, serviceDetailsRepository, serviceCommentRepository);
    serviceDetailsRequest = {
      idService: 'service-id',
      getIdService: jest.fn()
    };
  });

  it('should return service details with estimated duration', async () => {
    const mockService = {
      dataValues: {}
    };
    const mockServiceComments: any[] = [];

    jest.spyOn(agendaService, 'estimatedServiceDuration').mockResolvedValue(1); // Mock the estimated duration
    jest.spyOn(authentificationService, 'getClientsProfile').mockResolvedValue([]);
    jest.spyOn(serviceDetailsRepository, 'findService').mockResolvedValue(mockService as any);
    jest.spyOn(serviceCommentRepository, 'findAllServiceCommentsById').mockResolvedValue(mockServiceComments as any[]);
    jest.spyOn(serviceDetailsRepository, 'findAllServiceDemandeCostsById').mockResolvedValue([] as any[]);
    jest.spyOn(converter, 'convertBinaryToUuid').mockReturnValue('service-id');
    jest.spyOn(awsBucket, 'getPublicObjectUrl').mockReturnValue("image-url");

    const result = await serviceDetailsService.getServiceDetails(serviceDetailsRequest as any);

    expect(result).toEqual({
      averageCost: 0,
      description: undefined,
      estimatedServiceDuration: 1,
      image: 'image-url',
      nomService: undefined,
      numCategorie: "service-id",
      numService: "service-id",
      comments: [],
    });
  });

  it('should throw InternalServerError if service is not found', async () => {
    jest.spyOn(serviceDetailsRepository, 'findService').mockResolvedValue(null);

    await expect(serviceDetailsService.getServiceDetails(serviceDetailsRequest as any)).rejects.toThrow(InternalServerError);
  });
});
