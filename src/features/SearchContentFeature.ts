import { SearchContentRepository } from "../Repository/SearchContentRepository";
import { SearchContentController } from "../controllers/SearchContentController";
import { SearchContentService } from "../services/SearchContentService";

const searchContentRepository = new SearchContentRepository();
const searchContentService = new SearchContentService(searchContentRepository);
const searchContentController = new SearchContentController(searchContentService);

export {searchContentRepository, searchContentService, searchContentController}