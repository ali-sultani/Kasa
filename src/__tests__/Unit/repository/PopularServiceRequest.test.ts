import express, { json } from "express";
import { router } from "../../../routes/router";
import { PopularServiceRequest } from "../../../Repository/PopularServiceRequest";
import { ServicePopulaireResponse } from "../../../models/ApiResponse/IServicePopulaireResponse";
import { servicePopDefault } from "../../../data/ServicePopulaireDefault";
import { awsBucket } from "../../../features/HelperFeature";
import { DemandeDeService } from "../../../models/TableModels/DemandeDeServiceTable";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('popular service request', () => {

  let popularServiceRequestMock!: PopularServiceRequest;
  let mockSequelizeFunc: any;

  beforeEach(() => {
    popularServiceRequestMock = new PopularServiceRequest();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAllServicesOnDemand', () => {

      it('should call findAll', async () => {
        mockSequelizeFunc = jest.spyOn(DemandeDeService, 'findAll').mockResolvedValue([]);
        popularServiceRequestMock.findAllServicesOnDemand();
        expect(mockSequelizeFunc).toHaveBeenCalled();
      });
  });

  describe('getDefaultPopularService', () => {

      it('should map defaultServicePopularValue', async () => {

        let expectedDefaultPopularService!: ServicePopulaireResponse[];
        expectedDefaultPopularService = [];
        
        for(let service of servicePopDefault.servicePopulaire)
        {
          expectedDefaultPopularService.push({
            num_service: service.num_service,
            nomService:service.nom_service,
            image: awsBucket.getPublicObjectUrl(service.id_image),
          });
        }
        const receivedDefaultPopularService = await popularServiceRequestMock.getDefaultPopularService();
        expect(receivedDefaultPopularService).toEqual(expectedDefaultPopularService);
      });
  });

});


