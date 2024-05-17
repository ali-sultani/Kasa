import { JobberCompetenceRepository } from '../Repository/JobberCompetenceRepository';
import { InternalServerError } from '../errors/InternalServerError';

export class JobberCompetenceService {

    constructor(private request: JobberCompetenceRepository) {
    }

    public async addCompetence(num_jobber: string, num_service: string, exigences: string[]): Promise<any> {
        try {
            const jobberService = await this.request.addServiceToJobber(num_jobber, num_service);
            const jobberExigences = [];
            for (const exigence of exigences) {
                const jobberExigence = await this.request.addJobberExigence(num_jobber, exigence);
                const exigenceData = await this.request.getExigences(jobberExigence.num_exigence);
                jobberExigences.push(exigenceData.description);
            }

            return {
                "num_jobber": jobberService.num_jobber,
                "num_service": jobberService.num_service,
                "exigences": jobberExigences
            };
        } catch (error) {
            throw new InternalServerError("Une erreur est survenue lors de l'ajout de la compétence" + error);
        }
    }
}
