
import express, { json } from "express";
import { faker } from "@faker-js/faker";
import { router } from "../../../routes/router";
import { AwsBucket } from "../../../Helpers/AwsBucketUtils";
import { Utils } from "../../../Helpers/Utils";
import { Converter } from "../../../Helpers/Converter";
import crypto from 'crypto';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const app = express();

app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(router);

describe('AwsBucket', () => {

    let awsBucketMock!: AwsBucket;
    let converterMock!: Converter;
    let image!: any;
    beforeAll(() => {
        image = faker.image.dataUri();

        //@ts-ignore
        jest.spyOn(crypto, 'randomBytes').mockReturnValue("test");
        //@ts-ignore
        jest.spyOn(Utils.prototype, 'resizeImage').mockResolvedValue("test");
        //@ts-ignore
        jest.spyOn(Converter.prototype, 'convertImageToBinary').mockResolvedValue(null);
        //@ts-ignore
        jest.spyOn(AwsBucket.prototype, 'bucketInfo').mockReturnValue(new S3Client());
        //@ts-ignore
        jest.spyOn(S3Client.prototype, 'send').mockResolvedValue(null);

        converterMock = {
            convertImageToBinary: jest.fn().mockResolvedValue(null)
        } as unknown as Converter;

        awsBucketMock = new AwsBucket();
        awsBucketMock.sendImageToS3(image);
    });

    describe('sendImageToS3', () => {

        describe('Given image', () => {

            it('should call resizeImage and convertImageToBinary with image', async () => {
                expect(Utils.prototype.resizeImage).toHaveBeenCalledWith(await new Converter().convertImageToBinary(image));
            })

            it('should call randomBytes with 32 bytes and transform it to hex string', async () => {
                expect(crypto.randomBytes).toHaveBeenCalledWith(32);
            })

            it('should call bucketInfo and send function with PutObjectCommand instance and right parameters', async () => {

                expect(S3Client.prototype.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
            })
        });
    });
});


