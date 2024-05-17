import { HomePageService } from "../services/HomePageService";
import { HttpStatusCode } from "../data/HttpStatusCode";
import { SendResponse } from "../implementations/SendResponse";
import { SendNext } from "../implementations/SendNext";

export class HomePageController {
  constructor(private homePageService: HomePageService) {}

  public async getHomePageData(sendResponse: SendResponse, sendNext: SendNext) {
    try {
      const homePageData = await this.homePageService.getHomePageData();
      sendResponse.send(HttpStatusCode.statutOk, homePageData);
    } catch (error: any) {
      sendNext.send(error);
    }
  }
}
