import { HomePageRepository } from "../Repository/HomePageRepository";
import { Specification } from "../data/Specification";
import { CategoryResponse } from "../models/ApiResponse/CategoryResponse";
import { ServiceWithCountResponse } from "../models/ApiResponse/ServiceWithCountResponse";

export class HomePageService {
  constructor(private homePageRepository: HomePageRepository) {}

  public async getHomePageData() {
    const categories: CategoryResponse[] = await this.homePageRepository.getAllCategories();
    const servicesWithCount: ServiceWithCountResponse[] = await this.homePageRepository.getAllServicesWithDemandeServiceCount();
    const popularServices = this.getPopularServices(servicesWithCount);
    const recommendedServices = this.getRecommendedServices(servicesWithCount);

    return { categories, popularServices, recommendedServices };
  }

  private getPopularServices(services: ServiceWithCountResponse[]) {
    const servicesInDescendingOrderByCount = services.sort((a, b) => b.demandeServiceCount - a.demandeServiceCount);
    const popularServices = servicesInDescendingOrderByCount.slice(0, Specification.nombreDeServicePopulaire);
    return popularServices;
  }

  // TODO: La logique de cette fonction est temporaire et sera modifé dans le futur
  private getRecommendedServices(services: ServiceWithCountResponse[]) {
    const tempRecommendedServices = ["Livrer un colis", "Maquilleur/Maquilleuse", "Coaching sportif personnel", "Promenade de chien"];
    return services.filter((service) => tempRecommendedServices.includes(service.nomService));
  }
}