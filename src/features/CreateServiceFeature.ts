import { CreateServiceRequest } from "../Repository/CreateServiceRequest";
import { CreateServiceCommandHandler } from "../controllers/CreateServiceCommandHandler";
import { CreateServiceCommand } from "../models/Command/CreateServiceCommand";
import { CreateServiceCommandManage } from "../services/CreateServiceCommandManage";

const createServiceCommand = new CreateServiceCommand();
const createServiceRequest = new CreateServiceRequest();
const createServiceCommandManage = new CreateServiceCommandManage(createServiceRequest);
const createServiceCommandHandler = new CreateServiceCommandHandler(createServiceCommandManage);


export { createServiceCommand,createServiceCommandHandler }