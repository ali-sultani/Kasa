import { JobberCompetenceRepository } from "../Repository/JobberCompetenceRepository";
import { JobberCompetenceService } from "../services/JobberCompetenceService";
import { JobberCompetenceController } from "../controllers/JobberCompetenceController";

const jobberCompetenceRepository = new JobberCompetenceRepository();
const jobberCompetenceService = new JobberCompetenceService(jobberCompetenceRepository);
const jobberCompetenceController = new JobberCompetenceController(jobberCompetenceService);

export {jobberCompetenceRepository, jobberCompetenceService, jobberCompetenceController}