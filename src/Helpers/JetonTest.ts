
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../errors/InternalServerError';
import { HttpStatusCode } from '../data/HttpStatusCode';

export class JetonTest{

  constructor(req: Request, res: Response,next:NextFunction){
    this.generateJetonTest(req,res,next);
}
    public generateJetonTest (req: Request, res: Response,next:NextFunction)
    {
      try{
        const userJwt = jwt.sign(
          {
            id: req.body.id,
            email: req.body.email
          },
          process.env.JWT_KEY!
        );
        req.session = {
          jwt: userJwt
        };

        res.status(HttpStatusCode.statutCreated).send();
      }
      catch(err:any)
      {
         throw new InternalServerError(err);
      }
    }

}