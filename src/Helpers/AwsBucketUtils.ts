import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
import { InternalServerError } from "../errors/InternalServerError";
import { converter, utils } from "../features/HelperFeature";
import { BUCKET_INFO } from "../config";

const { getImageMime } = require('base64-image-mime');

export class AwsBucket {
  constructor() { }

  public async getSignedImageUrl(image: string) {
    try {
      return await getSignedUrl(
        this.bucketInfo(),
        new GetObjectCommand({
          Bucket: BUCKET_INFO.BUCKET_NAME,
          Key: image
        }),
        { expiresIn: 180 }
      ).then(function (result) {
        return result; 
      })
    }
    catch (err: any) {
      throw new InternalServerError(err);
    }
  }

  public getPublicObjectUrl(image: string): string {
    return `https://${BUCKET_INFO.BUCKET_NAME}.s3.${BUCKET_INFO.BUCKET_REGION}.amazonaws.com/${image}`;
  }

  public async sendImageToS3(image:string) :Promise<String>
  {
    const imageMimeType = getImageMime(image);
    const fileBuffer = await utils.resizeImage(await converter.convertImageToBinary(image));

    const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

    const fileName = generateFileName();
    const uploadParams = {
      Bucket: BUCKET_INFO.BUCKET_NAME,
      Body: fileBuffer,
      Key:  fileName,
      ContentType: imageMimeType
    }
  
      return await this.bucketInfo().send(new PutObjectCommand(uploadParams)).then(()=>{
         return fileName;
      });
  }

  private bucketInfo(): S3Client {
    const region = BUCKET_INFO.BUCKET_REGION;
    const accessKeyId = BUCKET_INFO.ACCESS_KEY;
    const secretAccessKey = BUCKET_INFO.SECRET_ACCESS_KEY;

    return new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }
}