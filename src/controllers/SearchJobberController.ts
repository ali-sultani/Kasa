import { HttpStatusCode } from '../data/HttpStatusCode';
import { SendNext } from '../implementations/SendNext';
import { SendResponse } from '../implementations/SendResponse';
import { SearchJobberCommand } from '../models/Command/SearchJobberCommand';
import { SearchJobberService } from '../services/SearchJobberService';

export class SearchJobberController {
  constructor(private searchJobberService: SearchJobberService) {}
  
  public async searchJobber(searchJobberCommand: SearchJobberCommand, sendResponse: SendResponse, sendNext: SendNext) {
    try {
      return await this.searchJobberService.searchJobbers(searchJobberCommand).then(async (jobber: any) => {
        sendResponse.send(HttpStatusCode.statutOk, jobber);
      });
    }
    catch (err) {
      sendNext.send(err);
    }
  }
}
