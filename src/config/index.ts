
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Categorie } from "../models/TableModels/CategorieTable";
import { DemandeDeService } from "../models/TableModels/DemandeDeServiceTable";
import { Service } from "../models/TableModels/ServiceTable";
import { ServiceComment } from "../models/TableModels/ServiceCommentTable";
import { JobberService } from "../models/TableModels/JobberServiceTable";
import { JobberExigence } from "../models/TableModels/JobberExigenceTable";
import { Exigence } from "../models/TableModels/ExigenceTable";

dotenv.config();
const dbPort: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

const DB_CONNECTION = new Sequelize({
  dialect: "mysql",
  port: dbPort,
  host: process.env.DB_HOST,
  username:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
  logging: false,
  models: [ServiceComment, DemandeDeService, Categorie, Service, JobberService, JobberExigence, Exigence]
});

const PORT = 8001;

const AGENDA_SERVICE_BASE_URL = "http://proxy/agenda-service";
const AUTHENTIFICATION_SERVICE_BASE_URL = "http://proxy/authentification-service";
const POSTIONSTACK_URL = "http://api.positionstack.com/v1/forward";

const BUCKET_INFO = {
  BUCKET_NAME: 'secouriste',
  BUCKET_REGION:'ca-central-1',
  ACCESS_KEY:'AKIAZX5GLDJ2KWT6RWE4',
  SECRET_ACCESS_KEY:'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'
};

export {
  AGENDA_SERVICE_BASE_URL,
  AUTHENTIFICATION_SERVICE_BASE_URL,
  POSTIONSTACK_URL,
  PORT,
  DB_CONNECTION,
  BUCKET_INFO
};



