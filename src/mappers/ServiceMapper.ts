import { converter, awsBucket } from "../features/HelperFeature";
import { ServiceWithCountResponse } from "../models/ApiResponse/ServiceWithCountResponse";
import { Service } from "../models/TableModels/ServiceTable";
import { ServiceResponse } from "../models/ApiResponse/ServiceResponse";

export class ServiceMapper {
  static async mapToServiceWithCountResponse(service: Service): Promise<ServiceWithCountResponse> {
    return {
      numService: converter.convertBinaryToUuid(service.num_service),
      numCategorie: converter.convertBinaryToUuid(service.num_categorie),
      nomService: service.nom_service,
      demandeServiceCount: service.getDataValue('demandeServiceCount'),
      image: service.image ? awsBucket.getPublicObjectUrl(service.image) : null,
    };
  }

  static mapToServiceResponse(service: Service): ServiceResponse {
    return {
      numService: converter.convertBinaryToUuid(service.num_service),
      numCategorie: converter.convertBinaryToUuid(service.num_categorie),
      nomService: service.nom_service,
      image: awsBucket.getPublicObjectUrl(service.image),
      description: service.description,
    };
  }

  static async mapArrayToServiceWithCountResponses(services: Service[]): Promise<ServiceWithCountResponse[]> {
    return Promise.all(services.map((service) => this.mapToServiceWithCountResponse(service)));
  }
}
