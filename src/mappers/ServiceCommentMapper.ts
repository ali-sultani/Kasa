import { converter } from "../features/HelperFeature";
import { ServiceComment } from "../models/TableModels/ServiceCommentTable";
import { ServiceCommentResponse } from "../models/ApiResponse/ServiceCommentResponse";

export class ServiceCommentMapper {
  static mapToServiceCommentResponse(serviceComment: ServiceComment): ServiceCommentResponse {
    return {
      commentId: converter.convertBinaryToUuid(serviceComment.comment_id),
      numService: converter.convertBinaryToUuid(serviceComment.num_service),
      numClient: converter.convertBinaryToUuid(serviceComment.num_client),
      comment: serviceComment.comment_text,
      commentDate: serviceComment.comment_date,
      note: serviceComment.note,
    };
  }

  static mapArrayToServiceCommentResponses(serviceComments: ServiceComment[]): ServiceCommentResponse[] {
    return serviceComments.map((comment) => this.mapToServiceCommentResponse(comment));
  }
}
