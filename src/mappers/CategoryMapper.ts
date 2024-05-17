import { converter, awsBucket } from "../features/HelperFeature";
import { Categorie } from "../models/TableModels/CategorieTable";
import { CategoryResponse } from "../models/ApiResponse/CategoryResponse";

export class CategoryMapper {
  static async mapToCategoryResponse(category: Categorie): Promise<CategoryResponse> {
    return {
      numCategorie: converter.convertBinaryToUuid(category.num_categorie),
      numParentCategorie: category.num_parent_categorie ? converter.convertBinaryToUuid(category.num_parent_categorie) : null,
      nomCategorie: category.nom_categorie,
      image: category.image ? awsBucket.getPublicObjectUrl(category.image) : null,
    };
  }

  static async mapArrayToCategoryResponses(categories: Categorie[]): Promise<CategoryResponse[]> {
    return Promise.all(categories.map((category) => this.mapToCategoryResponse(category)));
  }
}
