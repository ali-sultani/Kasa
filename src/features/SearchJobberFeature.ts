import { SearchJobberRepository } from "../Repository/SearchJobberRepository";
import { SearchJobberController } from "../controllers/SearchJobberController";
import { SearchJobberService } from "../services/SearchJobberService";
import { SearchJobberCommand } from "../models/Command/SearchJobberCommand";
import { AgendaService } from "../services/AgendaService";
import { AuthentificationService } from "../services/AuthentificationService";

const agendaService = new AgendaService();
const authentificationService = new AuthentificationService();
const searchJobberCommand = new SearchJobberCommand();
const searchJobberRepository = new SearchJobberRepository();
const searchJobberService = new SearchJobberService(searchJobberRepository, authentificationService, agendaService);
const searchJobberController = new SearchJobberController(searchJobberService);

export { searchJobberCommand, searchJobberRepository, searchJobberService, searchJobberController }