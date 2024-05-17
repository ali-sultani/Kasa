import { ServiceCommentRepository } from "../Repository/ServiceCommentRepository";
import { ServiceDetailsRepository } from "../Repository/ServiceDetailsRepository";
import { InternalServerError } from "../errors/InternalServerError";
import { ServiceCommentMapper } from "../mappers/ServiceCommentMapper";
import { ServiceMapper } from "../mappers/ServiceMapper";
import { ServiceDetailsRequest } from "../models/ApiRequest/ServiceDetailsRequest";
import { AgendaService } from "./AgendaService";
import { AuthentificationService } from "./AuthentificationService";

export class ServiceDetailsService {
  constructor(
    private agendaService: AgendaService,
    private authentificationService: AuthentificationService,
    private serviceDetailsRepository: ServiceDetailsRepository,
    private serviceCommentRepository: ServiceCommentRepository
  ) {}

  public async getServiceDetails(serviceDetailsRequest: ServiceDetailsRequest) {
    const service = await this.serviceDetailsRepository.findService(serviceDetailsRequest.getIdService());

    if (!service || (service && !service.dataValues)) throw new InternalServerError('Service not found');

    const serviceComments = await this.serviceCommentRepository.findAllServiceCommentsById(serviceDetailsRequest.getIdService());
    const allServiceCosts = await this.serviceDetailsRepository.findAllServiceDemandeCostsById(serviceDetailsRequest.getIdService());
    const estimatedServiceDuration = await this.agendaService.estimatedServiceDuration(serviceDetailsRequest.getIdService());
    
    const detailsService = ServiceMapper.mapToServiceResponse(service.dataValues);
    const comments = ServiceCommentMapper.mapArrayToServiceCommentResponses(serviceComments);
    const clientIds = comments.map((comment) => comment.numClient);
    
    const clients = await this.authentificationService.getClientsProfile(clientIds);
    const commentsWithClientInfo = comments.map((comment) => ({
      ...comment,
      client: clients.find((client) => client.numClient === comment.numClient)
    }));
  
    const averageCost = allServiceCosts.length > 0 ? allServiceCosts.reduce((acc, current) => acc + parseFloat(current.dataValues.taux_horaire), 0) / allServiceCosts.length : 0;

    return {
      ...detailsService,
      averageCost,
      comments: commentsWithClientInfo,
      estimatedServiceDuration
    };
  }
}