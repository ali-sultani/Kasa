import { SendNext } from "./SendNext";
import { SendResponse } from "./SendResponse";

export default class ResponseFactory {
  private constructor() {}
  
  static createSendResponse(): SendResponse {
    return new SendResponse();
  }

  static createSendNext(): SendNext {
    return new SendNext();
  }
}