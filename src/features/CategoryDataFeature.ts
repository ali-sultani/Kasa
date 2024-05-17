import { CategoryDataRepository } from "../Repository/CategoryDataRepository";
import { CategoryDataService } from "../services/CategoryDataService";
import { CategoryDataController } from "../controllers/CategoryDataController";

const categoryDataRepository = new CategoryDataRepository();
const categoryDataService = new CategoryDataService(categoryDataRepository);
const categoryDataController = new CategoryDataController(categoryDataService);

export {categoryDataRepository, categoryDataService, categoryDataController}