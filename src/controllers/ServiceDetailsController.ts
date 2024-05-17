import { ServiceDetailsService } from "../services/ServiceDetailsService";
import { HttpStatusCode } from "../data/HttpStatusCode";
import { ServiceDetailsRequest } from "../models/ApiRequest/ServiceDetailsRequest";
import { SendResponse } from "../implementations/SendResponse";
import { SendNext } from "../implementations/SendNext";

export class ServiceDetailsController {
  constructor(private serviceDetailsService: ServiceDetailsService) {}

  public async getServiceDetails(serviceDetailsRequest: ServiceDetailsRequest, sendResponse: SendResponse, sendNext: SendNext) {
    try {
      const data = await this.serviceDetailsService.getServiceDetails(serviceDetailsRequest);
      sendResponse.send(HttpStatusCode.statutOk, data);
    } catch (error: any) {
      sendNext.send(error);
    }
  }
}
