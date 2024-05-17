import { Response } from "express";
import { HttpStatusCode } from "../data/HttpStatusCode";
import { ISendResponse } from "../models/ISendResponse";

export class SendResponse implements ISendResponse{
    private res!: Response;

    constructor(){}

    bindResponse(res:Response) {
        this.res = res;
    }

    send(codeStatut: HttpStatusCode, value: any) {
        this.res.status(codeStatut).json(value);
    }    
}