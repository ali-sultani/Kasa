import { SearchJobberRepository } from '../Repository/SearchJobberRepository';
import { converter } from '../features/HelperFeature';
import { SearchJobberCommand } from '../models/Command/SearchJobberCommand';
import { AuthentificationService } from './AuthentificationService';
import { AgendaService } from './AgendaService';
import { SearchJobberResponse } from '../models/ApiResponse/SearchJobberResponse';
import { JobberProfileMapper } from '../mappers/JobberProfileMapper';
import { ServiceCommentMapper } from '../mappers/ServiceCommentMapper';
import { GoogleGeolocalisationService } from './GoogleGeolocalisationService';

export class SearchJobberService {

    constructor(
        private repository: SearchJobberRepository,
        private authentificationService: AuthentificationService,
        private agendaService: AgendaService,
        ) {
    }

    public async searchJobbers(searchJobberCommand : SearchJobberCommand): Promise<SearchJobberResponse[]> {

        // chercher les jobbers qui ont le service
        const jobbers = (await this.repository.findNumJobberByNumService(searchJobberCommand.getNumService())).map((jobber) => {
            return converter.convertBinaryToUuid(jobber.num_jobber)
        });

        // avoir les profiles des jobbers
        let profiles = await this.authentificationService.getJobbersProfile(jobbers);

        let response: SearchJobberResponse[] = [];
        for (const profile of profiles) {
            const nombreCommentaire = await this.repository.calculateCommentsCount(profile.numJobber);
            const nombreServiceRealise = await this.repository.calculateServicesRealisedByJobberCount(profile.numJobber);
            const tauxHoraire = await this.repository.calculateAverageTauxHoraire(profile.numJobber, searchJobberCommand.getNumService());
            
            const jobberComments = await this.repository.getComments(profile.numJobber);
            const comments = ServiceCommentMapper.mapArrayToServiceCommentResponses(jobberComments);
            const clientIds = comments.map((comment) => comment.numClient);
            const clients = await this.authentificationService.getClientsProfile(clientIds);
            const formattedComments = comments.map((comment) => {
                const client = clients.find((client) => client.numClient === comment.numClient);
                return {
                    ...comment,
                    client: {
                        nom: client?.nom,
                        prenom: client?.prenom,
                        photo: client?.photo,
                    }
                };
            });
            
            response.push(JobberProfileMapper.mapToSearchJobberResponse(
                profile,
                nombreCommentaire,
                nombreServiceRealise, 
                tauxHoraire,
                searchJobberCommand.getExigences().join(", "),
                formattedComments
            ));
        }

        // filtrer les jobbersProfile selon la meilleure note
        response = await this.sortJobbersByNoteDescending(response);

        // filtrer les jobbersProfile selon la proximité
        response = await this.filterJobbersByProximity(searchJobberCommand.getCodePostal(), response);

        // filtrer les jobbersProfile selon la disponibilité
        response = await this.filterJobbersByAvailability(searchJobberCommand.getDateHeure(), response);

        // TODO: filtrer les jobbers selon les exigences du client
        for (const jobber of response) {
            const jobberCompetences = await this.repository.getJobberCompetences(jobber.numJobber);
            console.log(jobberCompetences);
            console.log("exigences du client:");
            console.log(searchJobberCommand.getExigences());
            jobber.respectExigence = true;
            searchJobberCommand.getExigences().forEach((exigence) => {
                if (!jobberCompetences.includes(exigence)) {
                    jobber.respectExigence = false;
                }
            }); 
        }
        return response;
    }

    /**
     * Filtrer les jobbers selon la proximité
     * @param clientCodePostal code postal du client
     * @param jobberProfiles profiles des jobbers
     * @returns profils des jobbers qui sont à proximité du client dans un rayon de 50 km
     */
    private async filterJobbersByProximity(clientCodePostal: string, jobberProfiles: SearchJobberResponse[]): Promise<SearchJobberResponse[]> {
        const filteredJobbers = await Promise.all(jobberProfiles.map(async (jobber) => {
            if (clientCodePostal && jobber.codePostal) {
                const distance = await GoogleGeolocalisationService.getDistance(clientCodePostal, jobber.codePostal);
                return distance <= 50 ? jobber : null;
            } else {
                return null;
            }
        }));

        return filteredJobbers.filter(Boolean) as SearchJobberResponse[];
    }

    /**
     * 
     * @param jobberProfiles profiles des jobbers
     * @returns profils des jobbers triés par note en ordre décroissant
     */
    private async sortJobbersByNoteDescending(jobberProfiles: SearchJobberResponse[]): Promise<SearchJobberResponse[]> {
        let profilesWithNotes : SearchJobberResponse[] = await Promise.all(jobberProfiles.map(async (profile) => {
            const note = await this.repository.calculateNoteJobber(profile.numJobber);
            const profileWithNote: SearchJobberResponse = {
                ...profile, 
                note: note, 
            };
            
            return profileWithNote;
        }));
    
        // Sort the profiles by note in descending order
        profilesWithNotes.sort((a, b) => b.note - a.note);
    
        return profilesWithNotes;
    }

    /**
     * 
     * @param date date de la demande
     * @param jobberProfiles profiles des jobbers
     * @returns profiles des jobbers qui sont disponibles
     */
    private async filterJobbersByAvailability(date: Date, jobberProfiles: SearchJobberResponse[]): Promise<SearchJobberResponse[]> {
        const filteredJobbers = await Promise.all(jobberProfiles.map(async (jobber) => {
            const jobberAvailability = await this.agendaService.getPlageHoraire(jobber.numJobber);
    
            // Check if the jobber has any availability after the given date
            const hasAvailabilityAfterDate = jobberAvailability.some((availability) => {
                return availability.dateDebut <= date || availability.dateFin >= date;
            });
    
            // If the jobber has availability after the given date, update properties
            if (hasAvailabilityAfterDate) {
                const isAvailable = jobberAvailability.some((availability) => {
                    return availability.dateDebut <= date && date <= availability.dateFin;
                });
    
                jobber.disponibiliteJobber = !isAvailable ? jobberAvailability : [];
                jobber.disponible = isAvailable;
                return true; // Keep this jobber in the filtered array
            } else {
                return false; // Exclude this jobber from the filtered array
            }
        }));
    
        // Filter out jobbers with availability before the given date
        return jobberProfiles.filter((_, index) => filteredJobbers[index]);
    }
        
}
