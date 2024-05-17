import { SearchContentRepository } from '../Repository/SearchContentRepository';
import { awsBucket, converter } from '../features/HelperFeature';

export class SearchContentService {

    constructor(private repository: SearchContentRepository) {
    }

    public async searchContent(motCle: string): Promise<any> {
        const service = await this.searchAndConvertContent(this.repository.findAllByNomService.bind(this.repository), motCle);
        const categorie = await this.searchAndConvertContent(this.repository.findAllByNomCategorie.bind(this.repository), motCle);
        const result = [...service, ...categorie].slice(0, 5);
        return result;
    }
    
    private async searchAndConvertContent(searchFunction: (mot_cle: string) => Promise<any[]>, mot_cle: string): Promise<any[]> {
        const content = await searchFunction(mot_cle);
    
        return Promise.all(
            content.map(async (c) => {
                const image = c.image ? await awsBucket.getPublicObjectUrl(c.image.toString()) : null;
                return {
                    numService: converter.convertBinaryToUuid(c.num_service),
                    nomService: c.nom_service,
                    image: image,
                };
            })
        );
    }
}
