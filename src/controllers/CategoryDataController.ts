import { HttpStatusCode } from '../data/HttpStatusCode';
import { SendNext } from '../implementations/SendNext';
import { SendResponse } from '../implementations/SendResponse';
import { CategoryDataService } from '../services/CategoryDataService';

export class CategoryDataController {
  constructor(private categoryDataService: CategoryDataService) {}
  
  public async getCategoryData(numCategorie: string, sendResponse: SendResponse, sendNext: SendNext) {
    try {
      return await this.categoryDataService.getCategoryData(numCategorie).then(async (categoryData: any) => {
        sendResponse.send(HttpStatusCode.statutOk, categoryData);
      });
    }
    catch (err) {
      sendNext.send(err);
    }
  }
}
