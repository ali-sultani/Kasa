import { HttpStatusCode } from '../data/HttpStatusCode';
import { SendNext } from '../implementations/SendNext';
import { SendResponse } from '../implementations/SendResponse';
import { JobberCompetenceService } from '../services/JobberCompetenceService';

export class JobberCompetenceController {
  constructor(private jobberCompetenceService: JobberCompetenceService) {}

  public async addCompetence(numJobber: string, competence : string, exigences: string [], sendResponse: SendResponse, sendNext: SendNext) {
    try {
      await this.jobberCompetenceService.addCompetence(numJobber, competence, exigences).then(async (content: any) => {
        sendResponse.send(HttpStatusCode.statutOk, content);
      });
    }
    catch (err) {
      sendNext.send(err);
    }
  }
}
