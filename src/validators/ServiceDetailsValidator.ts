import { Request, Response, NextFunction } from 'express';
import { param } from "express-validator";
import { ErrorMessage } from "../data/ErrorMessage";

export class ServiceDetailsValidator {
  public serviceDetailsValidationRules() {
    return [
      param('idService').notEmpty().withMessage(ErrorMessage.serviceDetails.serviceIdEmpty),
      (req: Request, res: Response, next: NextFunction) => {
        next();
      }
    ];
  }
}
