import axios from "axios";
import supertest from "supertest";
import { HttpStatusCode } from "../../data/HttpStatusCode";
import { ROUTER_PATH } from "../../data/RouterPath";
import express, { json } from "express";
import { router } from "../../routes/router";
import { ServiceDetailsRepository } from '../../Repository/ServiceDetailsRepository';
import { ServiceCommentRepository } from "../../Repository/ServiceCommentRepository";
import { Converter } from "../../Helpers/Converter";
import { AuthentificationService } from "../../services/AuthentificationService";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('ServiceDetails integration tests', () => {
  let serviceDetailsRequest!: any;
  let result!: any;
  let mockedConverter!: Converter;

  const mockServiceComment: any[] = [
    { comment_id: 1, num_service: 'serviceId', num_client: 'clientID', comment_text: 'Comment 1' },
    { comment_id: 2, num_service: 'serviceId', num_client: 'clientID', comment_text: 'Comment 2' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  beforeAll(() => {
    mockedConverter = new Converter();
    serviceDetailsRequest = {
      idService: 'service-id',
      getIdService: jest.fn()
    };
    result = {
      dataValues: {
        image: null,
        nom_service: undefined,
        num_categorie: mockedConverter.convertUuidToBinary('service-id'),
        num_service: mockedConverter.convertUuidToBinary('service-id'),
      }
    };
    jest.spyOn((ServiceDetailsRepository.prototype as any), 'findService').mockResolvedValue(result);
    jest.spyOn((ServiceDetailsRepository.prototype as any), 'findAllServiceDemandeCostsById').mockResolvedValue([] as any[]);
    jest.spyOn((ServiceCommentRepository.prototype as any), 'findAllServiceCommentsById').mockResolvedValue(mockServiceComment);
    jest.spyOn((AuthentificationService.prototype as any), 'getClientsProfile').mockResolvedValue([] as any[]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: 1 });
  });

  describe('Given Happy path', () => {
    it('should return 200 status code ok', async () => {
      const { statusCode } = await supertest(app).get(ROUTER_PATH.detailService).set('Content-Type', 'application/json').send(serviceDetailsRequest);
      expect(statusCode).toBe(HttpStatusCode.statutOk);
    });
  });
});