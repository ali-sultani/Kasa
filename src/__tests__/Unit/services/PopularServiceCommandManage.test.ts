
import express, { json } from "express";
import { faker } from "@faker-js/faker";
import { router } from "../../../routes/router";
import { BadRequestError } from "../../../errors/BadRequestError";
import { PopularServiceRequest } from "../../../Repository/PopularServiceRequest";
import { ServicePopulaireResponse } from "../../../models/ApiResponse/IServicePopulaireResponse";
import { PopularServiceCommandManage } from "../../../services/PopularServiceCommandManage";
import { DemandeDeService } from "../../../models/TableModels/DemandeDeServiceTable";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('Execute', () => {

  let commandManageMock: PopularServiceCommandManage;
  let popularServiceRequestMock: PopularServiceRequest;
  let defaultPopularServiceMock: ServicePopulaireResponse[];

  beforeAll(() => {

    defaultPopularServiceMock = [];

    defaultPopularServiceMock.push({
      num_service: faker.string.uuid(),
      nomService: faker.person.fullName(),
      image: faker.image.avatar()
    })

    popularServiceRequestMock = {
      getDefaultPopularService: jest.fn().mockReturnValue(defaultPopularServiceMock),
      findAllServicesOnDemand: jest.spyOn(PopularServiceRequest.prototype, 'findAllServicesOnDemand').mockResolvedValue([])
    } as unknown as PopularServiceRequest;

    commandManageMock = new PopularServiceCommandManage(popularServiceRequestMock);
    commandManageMock.execute();
  })

  afterAll(() => {
    jest.restoreAllMocks();
  })

  it('should call findAllServicesOnDemand', async () => {
    expect(popularServiceRequestMock.findAllServicesOnDemand).toHaveBeenCalled();
  });

  it('when nombreDeServiceDemandee is less than nombreDeServiceMin should call getDefaultPopularService', async () => {
    expect(popularServiceRequestMock.getDefaultPopularService).toHaveBeenCalled();
  });

  it('when nombreDeServiceDemandee is great than nombreDeServiceMin throw badRequestException with specific error message', async () => {

    popularServiceRequestMock = {
      getDefaultPopularService: jest.fn().mockReturnValue(defaultPopularServiceMock),
      findAllServicesOnDemand: jest.spyOn(PopularServiceRequest.prototype, 'findAllServicesOnDemand').
      mockResolvedValue([new DemandeDeService(), new DemandeDeService(), new DemandeDeService(), new DemandeDeService(), new DemandeDeService()])
    } as unknown as PopularServiceRequest;

    commandManageMock = new PopularServiceCommandManage(popularServiceRequestMock);
    expect(async () => { await commandManageMock.execute() }).rejects.
      toThrow(new BadRequestError("not implemented"));
  });
});


