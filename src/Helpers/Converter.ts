import 'express-async-errors'
import uuid from 'uuid-parse';

export class Converter {
  constructor() { }

  public convertBinaryToUuid(element: Buffer): string {
    return uuid.unparse(element);
  };

  public convertUuidToBinary(element: string): Buffer {
    return uuid.parse(element);
  }

  public async convertImageToBinary(imageBase64: string):Promise<Buffer>  {
    return Buffer.from(imageBase64, "base64");
  }
}