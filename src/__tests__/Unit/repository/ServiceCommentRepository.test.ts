import { ServiceCommentRepository } from '../../../Repository/ServiceCommentRepository';
import { ServiceComment } from '../../../models/TableModels/ServiceCommentTable';
import { InternalServerError } from '../../../errors/InternalServerError';

describe('ServiceCommentRepository tests', () => {
  let serviceCommentRepository: ServiceCommentRepository;

  const mockServiceComment: any[] = [
    { id: 1, num_service: 'serviceId', comment: 'Comment 1' },
    { id: 2, num_service: 'serviceId', comment: 'Comment 2' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    serviceCommentRepository = new ServiceCommentRepository();
  });

  it('findAllServiceCommentsById should return an array of ServiceComments', async () => {
    jest.spyOn(ServiceComment, 'findAll').mockResolvedValue(mockServiceComment);

    const idService = 'serviceId';
    const result = await serviceCommentRepository.findAllServiceCommentsById(idService);

    expect(result).toEqual(mockServiceComment);
  });

  it('findAllServiceCommentsById should throw InternalServerError on error', async () => {
    const idService = 'serviceId';

    (ServiceComment.findAll as jest.Mock).mockRejectedValue(new Error('Test error'));

    await expect(serviceCommentRepository.findAllServiceCommentsById(idService)).rejects.toThrow(InternalServerError);
  });
});
