
import { InternalServerError } from '../errors/InternalServerError';
import { ServicePopulaireResponse } from '../models/ApiResponse/IServicePopulaireResponse';
import { DemandeDeService } from '../models/TableModels/DemandeDeServiceTable';
import { servicePopDefault } from '../data/ServicePopulaireDefault';
import { awsBucket } from '../features/HelperFeature';

export class PopularServiceRequest {

    constructor() {
    }

    public async findAllServicesOnDemand(): Promise<DemandeDeService[]> {

        try {
            return await DemandeDeService.findAll();
        }
        catch (err: any) {
            throw new InternalServerError(err);
        }

    };

    public async getDefaultPopularService() :Promise<ServicePopulaireResponse[]> {
        let reponseParDefaut!: ServicePopulaireResponse[];
        reponseParDefaut = [];
    
          for(let service of servicePopDefault.servicePopulaire)
            {
              reponseParDefaut.push({
                num_service: service.num_service,
                nomService:service.nom_service,
                image: awsBucket.getPublicObjectUrl(service.id_image),
              });
            }
            return reponseParDefaut;
      }
}
