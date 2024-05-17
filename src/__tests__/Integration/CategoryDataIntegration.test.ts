import supertest from "supertest";
import { CategoryDataRepository } from "../../Repository/CategoryDataRepository";
import { HttpStatusCode } from "../../data/HttpStatusCode";
import express, { json } from "express";
import { router } from "../../routes/router";
import { Service } from "../../models/TableModels/ServiceTable";
import { Categorie } from "../../models/TableModels/CategorieTable";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('CategoryData integration tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  beforeAll(() => {
    const mockServices = [
      Service.build({
        num_service: Buffer.from('1'), 
        num_categorie: Buffer.from('2'), 
        nom_service: 'Sample Service',
        image: 'image1.jpg',
        demandeServices: [], 
        categorie: {
          num_categorie: Buffer.from('1'),
        },
      }),
    ];

    const mockCategories = [
      Categorie.build({
        num_categorie: Buffer.from('1'),
        nom_categorie: 'Sample Category',
        image: 'image2.jpg',
        services: [],
      }),
    ];

    jest.spyOn((CategoryDataRepository.prototype as any), 'findServicesByCategory').mockResolvedValue(mockServices);
    jest.spyOn((CategoryDataRepository.prototype as any), 'findSubCategoriesByCategory').mockResolvedValue(mockCategories);
  });

  describe('Given Happy path', () => {
    it('should return 200 status code ok', async () => {
      const motcle = 'test'; 
      const { statusCode } = await supertest(app)
        .get(`/api/data/categories/${motcle}`)
        .set('Content-Type', 'application/json')
        .send();
      expect(statusCode).toBe(HttpStatusCode.statutOk);
    });
  });
});