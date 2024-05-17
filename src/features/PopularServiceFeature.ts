import { PopularServiceRequest } from "../Repository/PopularServiceRequest";
import { PopularServiceCommandHandler } from "../controllers/PopularServiceCommandHandler";
import { PopularServiceCommandManage } from "../services/PopularServiceCommandManage";

const popularServiceRequest = new PopularServiceRequest();
const popularServiceCommandManage = new PopularServiceCommandManage(popularServiceRequest);
const popularServiceCommandHandler = new PopularServiceCommandHandler(popularServiceCommandManage);

export {popularServiceRequest, popularServiceCommandManage, popularServiceCommandHandler}