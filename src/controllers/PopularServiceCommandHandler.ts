import { HttpStatusCode } from '../data/HttpStatusCode';
import { SendNext } from '../implementations/SendNext';
import { SendResponse } from '../implementations/SendResponse';
import { PopularServiceCommandManage } from '../services/PopularServiceCommandManage';

export class PopularServiceCommandHandler {
  constructor(private popularServiceCommandManage: PopularServiceCommandManage) {}

  public async handle(sendResponse: SendResponse, sendNext: SendNext) {
    try {
      return await this.popularServiceCommandManage.execute().then(async (popularService: any) => {
        sendResponse.send(HttpStatusCode.statutOk, popularService);
      });
    }
    catch (err) {
      sendNext.send(err);
    }
  }
}
