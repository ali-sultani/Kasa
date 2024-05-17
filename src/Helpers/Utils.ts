import 'express-async-errors';
import sharp from 'sharp';



export class Utils {

    constructor() { }

    public async resizeImage(imageBase64:Buffer):Promise<any> {

        const fileBuffer = await sharp(imageBase64)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

        return fileBuffer;
    }


}