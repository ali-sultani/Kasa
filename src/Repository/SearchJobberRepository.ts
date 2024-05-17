import { InternalServerError } from '../errors/InternalServerError';
import { JobberService } from '../models/TableModels/JobberServiceTable';
import { Sequelize } from 'sequelize-typescript';
import { ServiceComment } from '../models/TableModels/ServiceCommentTable';
import { DemandeDeService } from '../models/TableModels/DemandeDeServiceTable';
import { JobberExigence } from '../models/TableModels/JobberExigenceTable';
import { Exigence } from '../models/TableModels/ExigenceTable';

export class SearchJobberRepository {

    constructor() {
    }
    
    public async findNumJobberByNumService(numService: string): Promise<JobberService[]> {
        try {
            return await JobberService.findAll({
                where: {
                    num_service: Sequelize.fn('UUID_TO_BIN', numService), 
                },
            });
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    public async calculateNoteJobber(numJobber: string): Promise<number> {
        try {
            const averageNote = await ServiceComment.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('note')), 'averageNote'],
                ],
                where: {
                    num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
                },
            });
    
            if (averageNote === null || averageNote.get('averageNote') === null) {
                return 0; 
            }
    
            return parseFloat(averageNote.get('averageNote') as string);
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    // Function to calculate number of comments for a jobber
    public async calculateCommentsCount(numJobber: string): Promise<number> {
        try {
            return await ServiceComment.count({
                where: {
                    num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
                },
            });
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    // Function to calculate number of services done by a jobber from table DemandeDeService
    public async calculateServicesRealisedByJobberCount(numJobber: string): Promise<number> {
        try {
            return await DemandeDeService.count({
                where: {
                    num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
                },
            });
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    // Function to get the average salary of a jobber based on a service from table DemandeDeService
    public async calculateAverageTauxHoraire(numJobber: string, numService: string): Promise<number> {
        try {
          const averageResult: any = await DemandeDeService.findOne({
            attributes: [
              [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('taux_horaire')), 2), 'average_taux_horaire']

            ],
            where: {
              num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
              num_service: Sequelize.fn('UUID_TO_BIN', numService),
            },
            raw: true
          });
      
          return averageResult?.average_taux_horaire || 0;
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    public async getComments(numJobber: string): Promise<ServiceComment[]> {
        try {
            return await ServiceComment.findAll({
                where: {
                    num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
                },
            });
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }

    public async getJobberCompetences(numJobber: string): Promise<string[]> {
        try {
            const jobberExigences = await JobberExigence.findAll({
                where: {
                    num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
                },
            });

            let exigences: string[] = [];
            for (const jobberExigence of jobberExigences) {
                const exigence = await Exigence.findOne({
                        where: {
                            num_exigence: jobberExigence.num_exigence,
                        },
                    });
                if (exigence) {
                    exigences.push(exigence.description);
                }
            }

            return exigences;
        } catch (err: any) {
            throw new InternalServerError(err);
        }
    }
    
}
