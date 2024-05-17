import { InternalServerError } from '../errors/InternalServerError';
import { DemandeDeService } from '../models/TableModels/DemandeDeServiceTable';
import { Service } from '../models/TableModels/ServiceTable';
import { Sequelize } from 'sequelize';

export class ServiceDetailsRepository {
  constructor() {}

  public async findService(idService: string): Promise<Service | null> {
    try {
        return await Service.findOne({
          where: {
            num_service: Sequelize.fn('UUID_TO_BIN', idService)
          },
        });
    } catch (err: any) {
        throw new InternalServerError(err);
    }
  }

  public async findAllServiceDemandeCostsById(idService: string) {
    try {
        return await DemandeDeService.findAll({
          attributes: ['taux_horaire'],
          where: {
            num_service: Sequelize.fn('UUID_TO_BIN', idService)
          },
        });
    } catch (err: any) {
        throw new InternalServerError(err);
    }
  }
}