import { InternalServerError } from '../errors/InternalServerError';
import { Categorie } from '../models/TableModels/CategorieTable';
import { Service } from '../models/TableModels/ServiceTable';
export class CreateServiceRequest {

    constructor() {
    }
    public async insertService(num_cat: any, imageName: String, nomService:String): Promise<any> {

        try {
            return await Service.create(
                {
                    num_categorie: num_cat,
                    image: imageName,
                    nom_service:nomService
                });
        }
        catch (err: any) {
            throw new InternalServerError(err);
        }
    }
  
    public async findCategory(nomCat: String): Promise<Categorie | null> {

        try {
            return await Categorie.findOne({ where: { nom_categorie: nomCat } });
        }
        catch (err: any) {
            throw new InternalServerError(err);
        }

    };

    public async findService(nomService: String): Promise<Service | null> {

        try {
            return await Service.findOne({ where: { nom_service: nomService } });
        }
        catch (err: any) {
            throw new InternalServerError(err);
        }

    };

}
