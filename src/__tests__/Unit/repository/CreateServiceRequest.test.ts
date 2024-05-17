
import express, { json } from "express";
import { faker } from "@faker-js/faker";
import { router } from "../../../routes/router";
import { Service } from "../../../models/TableModels/ServiceTable";
import { CreateServiceRequest } from "../../../Repository/CreateServiceRequest";
import { Categorie } from "../../../models/TableModels/CategorieTable";


const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('Create service request', () => {

  let createServiceRequestMock!: CreateServiceRequest;
  let mockSequelizeFunc: any;
  let serviceName: any;
  let categorieName: any;
  let numCat: any
  let imageName: any

  beforeEach(() => {
    serviceName = faker.person.fullName();
    categorieName = faker.person.fullName();
    numCat = faker.string.uuid();
    imageName = faker.image.dataUri();

    mockSequelizeFunc = jest.spyOn(Service, 'findOne').mockResolvedValue(null);
    createServiceRequestMock = new CreateServiceRequest();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('find service', () => {
    describe('Given serviceName', () => {

      it('should call findOne with right parameters from Sequelize', async () => {
        createServiceRequestMock.findService(serviceName)
        expect(mockSequelizeFunc).toHaveBeenCalledWith({ where: { nom_service: serviceName }, });
      });

    })
  });

  describe('find category', () => {

    describe('Given categoryName', () => {

      it('should call findOne with right parameters from Sequelize', async () => {
        mockSequelizeFunc = jest.spyOn(Categorie, 'findOne').mockResolvedValue(null);
        createServiceRequestMock.findCategory(categorieName);
        expect(mockSequelizeFunc).toHaveBeenCalledWith({ where: { nom_categorie: categorieName }, });
      });
    })
  });


  describe('insert Service', () => {

    describe('Given numCat, imageService and serviceName', () => {

      it('should call create with right parameters from Sequelize', async () => {
        mockSequelizeFunc = jest.spyOn(Service, 'create').mockResolvedValue(null);
        createServiceRequestMock.insertService(numCat, imageName, serviceName);
        expect(mockSequelizeFunc).toHaveBeenCalledWith({
          num_categorie: numCat,
          image: imageName,
          nom_service: serviceName
        });
      });
    })
  });
});


