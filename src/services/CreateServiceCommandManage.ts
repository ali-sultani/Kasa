
import { CreateServiceRequest } from '../Repository/CreateServiceRequest';
import { BadRequestError } from '../errors/BadRequestError';
import { ErrorMessage } from '../data/ErrorMessage';
import { awsBucket } from '../features/HelperFeature';

export class CreateServiceCommandManage {

    constructor(private request:CreateServiceRequest) {
    }

    public async execute(nomService:string, nomCategorie:string, image:string)
    {
        const service = await this.request.findService(nomService);
        const categorie = await this.request.findCategory(nomCategorie);

        if(service!= null)throw new BadRequestError(ErrorMessage.creationService.serviceExistant);
        if(categorie == null)throw new BadRequestError(ErrorMessage.creationService.categorieInexistant);
                
         await awsBucket.sendImageToS3(image).then(async (fileName:any)=>{
            await this.request.insertService(categorie.num_categorie, fileName, nomService);
           }); 
    }
}
