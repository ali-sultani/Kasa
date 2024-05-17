import { ServiceDetailsRepository } from '../../../Repository/ServiceDetailsRepository';
import { InternalServerError } from '../../../errors/InternalServerError';
import { Service } from '../../../models/TableModels/ServiceTable';

describe('ServiceDetailsRepository tests', () => {
  let serviceDetailsRepository: ServiceDetailsRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    serviceDetailsRepository = new ServiceDetailsRepository();
  });

  it('findService should return a Service', async () => {
    const mockService = { num_service: 'serviceId' };

    jest.spyOn(Service, 'findOne').mockResolvedValue(mockService as any);

    const result = await serviceDetailsRepository.findService('serviceId');

    expect(result).toEqual(mockService);
  });

  it('findService should throw InternalServerError on error', async () => {
    const error = new Error('Test error');

    (Service.findOne as jest.Mock).mockRejectedValue(error);

    await expect(serviceDetailsRepository.findService('service-id')).rejects.toThrow(InternalServerError);
  });
});
