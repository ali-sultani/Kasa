import { PopularServiceRequest } from '../Repository/PopularServiceRequest';
import { Specification } from '../data/Specification';
import { BadRequestError } from '../errors/BadRequestError';

export class PopularServiceCommandManage {

    constructor(private request: PopularServiceRequest) {
    }

    public async execute(): Promise<any> {
        await this.request.findAllServicesOnDemand().then(async (result) => {
            let nombreDeServiceDemandee = result.length;

            if (nombreDeServiceDemandee < Specification.nombreDeServiceMin) {
                return await this.request.getDefaultPopularService();
            }
            else {
                throw new BadRequestError("not implemented");
            }

        })

    }
}
