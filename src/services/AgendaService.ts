import axios from 'axios';
import { AGENDA_SERVICE_BASE_URL } from '../config';
import { AGENDA_ROUTER_PATH } from '../data/AgendaRouterPath';
import { BadRequestError } from '../errors/BadRequestError';
import { ErrorMessage } from '../data/ErrorMessage';
import { PlageHoraireDate } from '../models/ExternalApiResponse/AgendaResponse';

export class AgendaService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = AGENDA_SERVICE_BASE_URL;
  }

  public async estimatedServiceDuration(numService: string): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}${AGENDA_ROUTER_PATH.averageDuration}/${numService}`);
      return response.data;
    } catch(error: any) {
      throw new BadRequestError(`${ErrorMessage.agenda.fetchEstimatedServiceDurationFailed} ${error.message}`);
    }
  }

  public async getPlageHoraire(numJobber: string): Promise<PlageHoraireDate[]> {
    try {
      const response = await axios.get(`${this.baseUrl}${AGENDA_ROUTER_PATH.plageHoraire}/${numJobber}`);

      // Convert date strings to Date objects
      const plageHoraire: PlageHoraireDate[] = response.data.map((item: PlageHoraireDate) => {
        return {
            dateDebut: new Date(item.dateDebut),
            dateFin: new Date(item.dateFin),
        };
    });

      return plageHoraire;
    } catch(error: any) {
      throw new BadRequestError(`${ErrorMessage.agenda.fetchPlageHoraireFailed} ${error.message}`);
    }
  }
}