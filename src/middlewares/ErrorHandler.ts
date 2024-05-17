import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/AbstractError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    res.status(500).send({
      errors: [{ message: 'Something went wrong' }]
    });
  }
};
