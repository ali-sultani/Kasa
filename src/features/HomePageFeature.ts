import { HomePageRepository } from "../Repository/HomePageRepository";
import { HomePageService } from "../services/HomePageService";
import { HomePageController } from "../controllers/HomePageController";

const homePageRepository = new HomePageRepository();
const homePageService = new HomePageService(homePageRepository);
const homePageController = new HomePageController(homePageService);

export { homePageController, homePageRepository, homePageService };
