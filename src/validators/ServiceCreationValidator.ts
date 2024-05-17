const { body, validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from '../data/ErrorMessage';
import { validateRequest } from '../middlewares/ValidateRequest';
import {BadRequestError} from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import { RequestValidationError } from '../errors/requestValidationError';

export class ServiceCreationValidator{
    
    constructor(){}

        public validationRules()
        {
            return [
                body('nom_service').notEmpty().withMessage(ErrorMessage.creationService.champNomServiceVide),
                body('nom_cat').notEmpty().withMessage(ErrorMessage.creationService.champNomCategorieVide),
                body('image').notEmpty().withMessage(ErrorMessage.creationService.image.champImageVide),
                validateRequest,
                async (req: Request, res: Response,next:NextFunction) => {
                    if(!this.validateBase64Image(req.body.image))throw new BadRequestError(ErrorMessage.creationService.image.champImageInvalide);
                    next();
                }
              ]
        }

        private validateBase64Image(imageString:string):boolean
        {
            try {
                const decodedStr = Buffer.from(imageString, 'base64');
                const encodedStr = decodedStr.toString('base64');
                return encodedStr === imageString;
              } catch(err:any) {
                throw new InternalServerError(err);
              }
        }
    }
    


    