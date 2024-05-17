import { Sequelize } from 'sequelize-typescript';
import { InternalServerError } from '../errors/InternalServerError';
import { JobberExigence } from '../models/TableModels/JobberExigenceTable';
import { JobberService } from '../models/TableModels/JobberServiceTable'
import { Exigence } from '../models/TableModels/ExigenceTable';

export class JobberCompetenceRepository {
  constructor() {}

  public async addServiceToJobber(numJobber: string, numService: string): Promise<any> {
    try {
        return await JobberService.create({
            num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
            num_service: Sequelize.fn('UUID_TO_BIN', numService)
        });
    }
    catch (err: any) {
        throw new InternalServerError(err);
    }
  }

  public async addJobberExigence(numJobber: string, numExigence: string): Promise<any> {
    try {
      return await JobberExigence.create({
        num_jobber: Sequelize.fn('UUID_TO_BIN', numJobber),
        num_exigence: Sequelize.fn('UUID_TO_BIN', numExigence)
      });
    }
    catch (err: any) {
        throw new InternalServerError(err);
    }
  }

  getExigences(numExigence: string): Promise<any> {
    return Exigence.findOne({
      where: {
        num_exigence: Sequelize.fn('UUID_TO_BIN', numExigence)
      }
    });
  }
}