import { PlageHoraireDate } from "../ExternalApiResponse/AgendaResponse";
import { ServiceCommentResponse } from "./ServiceCommentResponse";

export type SearchJobberResponse = {
    prenom: string;
    nom: string;
    numJobber: string;
    note: number;
    nombreCommentaire: number;
    dateCreation: Date;
    nombreServiceRealise: number;
    tauxHoraire: number;
    disponible: boolean;
    disponibiliteJobber: PlageHoraireDate[];
    respectExigence: boolean;
    exigences: string;
    commentaires: ServiceCommentResponse[];
    langues: string[];
    description: string;
    codePostal: string;
    ville: string;
  };