import { Sequelize } from 'sequelize-typescript';
import { InternalServerError } from '../errors/InternalServerError';
import { converter } from '../features/HelperFeature';
import { ServiceComment } from '../models/TableModels/ServiceCommentTable';

export class ServiceCommentRepository {
  constructor() {}

  public async findAllServiceCommentsById(idService: string): Promise<ServiceComment[]> {
    try {
        return await ServiceComment.findAll({
          where: {
            num_service: Sequelize.fn('UUID_TO_BIN', idService)
          },
        });
    }
    catch (err: any) {
        throw new InternalServerError(err);
    }
  }
}