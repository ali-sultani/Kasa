import { HttpStatusCode } from "../data/HttpStatusCode";
import {Response } from 'express';

export interface ISendResponse{
   send(codeStatut:HttpStatusCode, valueToSent:any):any
   bindResponse(res:Response):any;
}

