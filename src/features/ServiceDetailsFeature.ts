import { AgendaService } from "../services/AgendaService";
import { ServiceDetailsController } from "../controllers/ServiceDetailsController";
import { ServiceDetailsService } from "../services/ServiceDetailsService";
import { ServiceDetailsRepository } from "../Repository/ServiceDetailsRepository";
import { ServiceDetailsRequest } from "../models/ApiRequest/ServiceDetailsRequest";
import { ServiceCommentRepository } from "../Repository/ServiceCommentRepository";
import { ServiceDetailsValidator } from "../validators/ServiceDetailsValidator";
import { AuthentificationService } from "../services/AuthentificationService";

const createServiceDetailsRequest = (): ServiceDetailsRequest => new ServiceDetailsRequest();

const agendaService = new AgendaService();
const authentificationService = new AuthentificationService();
const serviceDetailsRepository = new ServiceDetailsRepository();
const serviceCommentRepository = new ServiceCommentRepository();
const serviceDetailsService = new ServiceDetailsService(agendaService, authentificationService, serviceDetailsRepository, serviceCommentRepository);
const serviceDetailsController = new ServiceDetailsController(serviceDetailsService);
const serviceDetailsValidator = new ServiceDetailsValidator();

export { createServiceDetailsRequest, serviceDetailsController, serviceDetailsValidator };
