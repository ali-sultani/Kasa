import { CustomError } from '../models/AbstractError';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(`Internal server error ${message}`);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: `Internal server error ${this.message}` }];
  }
}
