import { faker } from '@faker-js/faker';
import supertest from "supertest";
import { HomePageRepository } from "../../Repository/HomePageRepository";
import { HttpStatusCode } from "../../data/HttpStatusCode";
import { ROUTER_PATH } from "../../data/RouterPath";
import express, { json } from "express";
import { router } from "../../routes/router";
import { Converter } from "../../Helpers/Converter";
import { Utils } from '../../Helpers/Utils';

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('HomePage integration tests', () => {
  let categories!: any;
  let services!: any;
  let mockedConverter!: Converter;
  let mockedUtils!: Utils;

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  beforeAll(() => {
    mockedConverter = new Converter();
    mockedUtils = new Utils();
    categories = [
      {
        image: null,
        numCategorie: faker.string.uuid(),
        numParentCategorie: null,
        nomCategorie: faker.string.uuid(),
      }
    ];
    services = [
      {
        numService: faker.string.uuid(),
        numCategorie: faker.string.uuid(),
        nomService: faker.person.fullName(),
        image: null,
        demandeServiceCount: 2
      }
    ];
    jest.spyOn((HomePageRepository.prototype as any), 'getAllCategories').mockResolvedValue(categories);
    jest.spyOn((HomePageRepository.prototype as any), 'getAllServicesWithDemandeServiceCount').mockResolvedValue(categories);
  });

  describe('Given Happy path', () => {
    it('should return 200 status code ok', async () => {
      const { statusCode } = await supertest(app).get(ROUTER_PATH.accueil).set('Content-Type', 'application/json').send();
      expect(statusCode).toBe(HttpStatusCode.statutOk);
    });
  });
});