import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { ROUTER_PATH } from "../../data/RouterPath";
import express, { json } from "express";
import { router } from '../../routes/router';
import { HttpStatusCode } from "../../data/HttpStatusCode";
import { Service } from "../../models/TableModels/ServiceTable";
import { ServiceCreationValidator } from "../../validators/ServiceCreationValidator";
import { CreateServiceRequest } from "../../Repository/CreateServiceRequest";
import { AwsBucket } from "../../Helpers/AwsBucketUtils";
import { PopularServiceRequest } from "../../Repository/PopularServiceRequest";
import { DemandeDeService } from "../../models/TableModels/DemandeDeServiceTable";
import { ServicePopulaireResponse } from "../../models/ApiResponse/IServicePopulaireResponse";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('Service Creation', () => {

  let findServiceMock!: jest.SpyInstance<Promise<Service | null>, [nomService: String], any>;
  let findCategoryMock = null;
  let sendImageToS3Mock = null;
  let insertServiceMock = null;
  beforeAll(() => {

    const categorie = {
      num_categorie: faker.string.uuid(),
      nom_categorie: faker.person.fullName(),
      image: faker.image.avatar()
    }
    //@ts-ignore
    findServiceMock = jest.spyOn(CreateServiceRequest.prototype, 'findService').mockReturnValueOnce(null);
    //@ts-ignore
    insertServiceMock = jest.spyOn(CreateServiceRequest.prototype, 'insertService').mockReturnValueOnce(null);
    //@ts-ignore
    findCategoryMock = jest.spyOn(CreateServiceRequest.prototype, 'findCategory').mockReturnValueOnce(categorie);
    //@ts-ignore
    sendImageToS3Mock = jest.spyOn(AwsBucket.prototype, 'sendImageToS3').mockImplementation(() => {
      return Promise.resolve('test');
    });
    //@ts-ignore
    validateBase64ImageMock = jest.spyOn(ServiceCreationValidator.prototype, 'validateBase64Image').mockReturnValueOnce(true);
  })
  describe('Given Happy path', () => {

    it('should return 201 status code created', async () => {
      const { statusCode } = await supertest(app).post(ROUTER_PATH.creerService).set('Content-Type', 'application/json').send({
        nom_cat: faker.person.fullName(),
        nom_service: faker.person.fullName(),
        image: faker.image.dataUri()
      })

      expect(statusCode).toBe(HttpStatusCode.statutCreated);
    });

  });
});


describe('popular service', () => {

  let findAllServicesOnDemandMock = null;
  let defaultPopularServiceMock!: ServicePopulaireResponse[];
  let getDefaultPopularServiceMock = null;

  beforeAll(() => {

    defaultPopularServiceMock = [];

    defaultPopularServiceMock.push({
      num_service: faker.string.uuid(),
      nomService: faker.person.fullName(),
      image: faker.image.avatar()
    })

    //@ts-ignore
    findAllServicesOnDemandMock = jest.spyOn(PopularServiceRequest.prototype, 'findAllServicesOnDemand').mockImplementation(() => {
      return Promise.resolve([]);
    })    //@ts-ignore
    getDefaultPopularServiceMock = jest.spyOn(PopularServiceRequest.prototype, 'getDefaultPopularService').mockReturnValueOnce(defaultPopularServiceMock);

  })
  describe('Given Happy path', () => {

    it('should return 200 status code', async () => {
      const { statusCode } = await supertest(app).get(ROUTER_PATH.popularService).set('Content-Type', 'application/json');
      expect(statusCode).toBe(HttpStatusCode.statutOk);
    });

  });
});


