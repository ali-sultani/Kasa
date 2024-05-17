import { SearchJobberResponse } from "../models/ApiResponse/SearchJobberResponse";
import { JobberProfile } from "../models/ExternalApiResponse/AuthentificationResponse";
import { PlageHoraireDate } from "../models/ExternalApiResponse/AgendaResponse";
import { ServiceCommentResponse } from "../models/ApiResponse/ServiceCommentResponse";

export class JobberProfileMapper {
  static mapToSearchJobberResponse(
    jobberProfile: JobberProfile,
    nombreCommentaire: number,
    nombreServiceRealise: number,
    tauxHoraire: number,
    exigence: string,
    commentaires: ServiceCommentResponse[]
    ): SearchJobberResponse {
    return {
      prenom: jobberProfile.prenom,
      nom: jobberProfile.nom,
      numJobber: jobberProfile.numJobber,
      note: 0,
      nombreCommentaire: nombreCommentaire,
      dateCreation: jobberProfile.dateCreationCompte,
      nombreServiceRealise: nombreServiceRealise,
      tauxHoraire: tauxHoraire,
      disponible: false,
      disponibiliteJobber: [],
      respectExigence: false,
      exigences: exigence,
      commentaires: commentaires,
      langues: jobberProfile.langues,
      description: jobberProfile.description,
      codePostal: jobberProfile.codePostal,
      ville: jobberProfile.ville,
    };
  }
}
