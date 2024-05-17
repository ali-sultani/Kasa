import { HttpStatusCode } from '../data/HttpStatusCode';
import { SendNext } from '../implementations/SendNext';
import { SendResponse } from '../implementations/SendResponse';
import { SearchContentService } from '../services/SearchContentService';
export class SearchContentController {
  constructor(private searchContentService: SearchContentService) {}

  public async searchContent(motCle: string, sendResponse: SendResponse, sendNext: SendNext) {
    try {
      return await this.searchContentService.searchContent(motCle).then(async (content: any) => {
        sendResponse.send(HttpStatusCode.statutOk, content);
      });
    }
    catch (err) {
      sendNext.send(err);
    }
  }
}
