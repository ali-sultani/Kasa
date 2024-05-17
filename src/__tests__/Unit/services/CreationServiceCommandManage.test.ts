
import express, { json } from "express";
import { faker } from "@faker-js/faker";
import { router } from "../../../routes/router";
import { CreateServiceCommandManage } from "../../../services/CreateServiceCommandManage";
import { CreateServiceRequest } from "../../../Repository/CreateServiceRequest";
import { AwsBucket } from "../../../Helpers/AwsBucketUtils";
import { BadRequestError } from "../../../errors/BadRequestError";
import { ErrorMessage } from "../../../data/ErrorMessage";


const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('Execute', () => {

  let commandManageMock: CreateServiceCommandManage;
  let createServiceRequestMock: CreateServiceRequest;
  let awsBucketMock: jest.SpyInstance
  let serviceName: any;
  let categorieName: any;
  let image: any;
  let categorie: any

  beforeAll(() => {

    serviceName = faker.person.fullName();
    categorieName = faker.person.fullName();
    image = faker.image.dataUri();

    categorie = {
      num_categorie: faker.string.uuid(),
      nom_categorie: faker.person.fullName(),
      image: faker.image.avatar()
    }

    createServiceRequestMock = {
      findService: jest.fn().mockReturnValue(null),
      findCategory: jest.fn().mockReturnValue(categorie),
      insertService: jest.fn()
    } as unknown as CreateServiceRequest;
    //@ts-ignore
    awsBucketMock = jest.spyOn(AwsBucket.prototype, 'sendImageToS3').mockResolvedValue("imageTest.png");
    commandManageMock = new CreateServiceCommandManage(createServiceRequestMock);
    commandManageMock.execute(serviceName, categorieName, image);
  })

  afterAll(() => {
    jest.restoreAllMocks();
  })

  describe('Given serviceName, categoryName, and image', () => {

    it('should call findCategory with categorieName and findService with serviceName from createServiceRequestMock', async () => {
      expect(createServiceRequestMock.findCategory).toHaveBeenCalledWith(categorieName);
      expect(createServiceRequestMock.findService).toHaveBeenCalledWith(serviceName);
    });

    it('when service is null and categorie is not null should call sendImageS3 from awsBucket and insertService from createServiceRequestMock', async () => {
      expect(awsBucketMock).toHaveBeenCalledWith(image);
      expect(createServiceRequestMock.insertService).toHaveBeenCalled();
    });


    it('when service is not null should throw badRequestException with specific error message', async () => {

      createServiceRequestMock = {
        findService: jest.fn().mockReturnValue({ nom_service: "test" }),
        findCategory: jest.fn().mockReturnValue(categorie),
      } as unknown as CreateServiceRequest;

      commandManageMock = new CreateServiceCommandManage(createServiceRequestMock);
      expect(async () => { await commandManageMock.execute(serviceName, categorieName, image) }).rejects.
        toThrow(new BadRequestError(ErrorMessage.creationService.serviceExistant));
    });

    it('when service is null and category is null should throw badRequestException with specific error message', async () => {

      createServiceRequestMock = {
        findService: jest.fn().mockReturnValue(null),
        findCategory: jest.fn().mockReturnValue(null),
      } as unknown as CreateServiceRequest;

      commandManageMock = new CreateServiceCommandManage(createServiceRequestMock);
      expect(async () => { await commandManageMock.execute(serviceName, categorieName, image) }).rejects.
        toThrow(new BadRequestError(ErrorMessage.creationService.categorieInexistant));
    });

  });

});


