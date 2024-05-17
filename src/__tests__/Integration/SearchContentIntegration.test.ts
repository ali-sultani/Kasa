import supertest from "supertest";
import { SearchContentRepository } from "../../Repository/SearchContentRepository";
import { HttpStatusCode } from "../../data/HttpStatusCode";
import express, { json } from "express";
import { router } from "../../routes/router";
import { Service } from '../../models/TableModels/ServiceTable';

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('SearchContent integration tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  beforeAll(() => {
    const mockServices = [
        Service.build({
          num_service: Buffer.from('1'), 
          num_categorie: Buffer.from('2'), 
          nom_service: 'Service 1',
          image: 'image1.jpg',
          demandeServices: [], 
          categorie: {
            num_categorie: Buffer.from('1'),
          },
        }),
        Service.build({
          num_service: Buffer.from('2'), 
          num_categorie: Buffer.from('2'), 
          nom_service: 'Service 2',
          image: 'image2.jpg',
          demandeServices: [], 
          categorie: {
            num_categorie: Buffer.from('2'),
          },
        }),
      ];

    jest.spyOn((SearchContentRepository.prototype as any), 'findAllByNomService').mockResolvedValue(mockServices);
    jest.spyOn((SearchContentRepository.prototype as any), 'findAllByNomCategorie').mockResolvedValue(mockServices);
  });

  describe('Given Happy path', () => {
    it('should return 200 status code ok', async () => {
      const motcle = 'test'; 
      const { statusCode } = await supertest(app)
        .get(`/api/data/recherche/${motcle}`)
        .set('Content-Type', 'application/json')
        .send();
      expect(statusCode).toBe(HttpStatusCode.statutOk);
    });
  });
});