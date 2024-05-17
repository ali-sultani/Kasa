import axios from 'axios';
import { AUTHENTIFICATION_SERVICE_BASE_URL } from '../config';
import { BadRequestError } from '../errors/BadRequestError';
import { ErrorMessage } from '../data/ErrorMessage';
import { AUTHENTIFICATION_ROUTER_PATH } from '../data/AuthentificationRouterPath';
import { ClientResponse } from '../models/ApiResponse/ClientResponse';
import { JobberProfile } from '../models/ExternalApiResponse/AuthentificationResponse';

export class AuthentificationService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = AUTHENTIFICATION_SERVICE_BASE_URL;
  }

  public async getClientsProfile(clientIds: string[]): Promise<ClientResponse[]> {
    try {
      const response = await axios.post(`${this.baseUrl}${AUTHENTIFICATION_ROUTER_PATH.getClientsProfile}`, { clientIds });
      return response.data;
    } catch(error: any) {
      throw new BadRequestError(`${ErrorMessage.authentification.fetchGetClientsProfileFailed} ${error.message}`);
    }
  }
  
  public async getJobbersProfile(jobberIds: string[]): Promise<JobberProfile []> {
    try {
        const response = await axios.post(`${this.baseUrl}${AUTHENTIFICATION_ROUTER_PATH.getJobbersProfile}`, {
          jobberIds: jobberIds,
        });

        return response.data;
    } catch(error: any) {
      throw new BadRequestError(`${ErrorMessage.authentification.getJobbersProfileFailed} ${error.message}`);
    }
  }
}