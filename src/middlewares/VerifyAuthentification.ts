import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/NotAuthorizedError';
import { ForbiddenError } from '../errors/ForbiddenError';

/**
 * permet de verifier si un utilisateur est présentement connecté ou du moins s'il possède un jwt valide
 */

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  // Extraction du header 'authorization' de la request
  const authHeader = req.headers['authorization'];
  if (!authHeader) throw new NotAuthorizedError();

  // Format du header : BEARER TOKENVALUE
  // Extraction du token en excluant 'BEARER'
  const token = authHeader.split(' ')[1];

  // Vérification du token, erreur 403 si invalide
  jwt.verify(
    token,
    process.env.JWT_KEY_ACCESSTOKEN!,
    (err, decoded) => {
      if (err) throw new ForbiddenError(); // token invalide
      const payload = decoded as UserPayload
      req.currentUser = payload;
      next();
    }
  );
}