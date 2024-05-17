import { NextFunction, Response } from "express";
import { IBinder } from "../models/IBinder";
import { SendResponse } from "./SendResponse";
import { SendNext } from "./SendNext";
import ResponseFactory from "./ResponseFactory";

export class Binder implements IBinder {
    constructor() {}

    bind(res: Response, next: NextFunction): { sendResponse: SendResponse, sendNext: SendNext } {
        const sendResponse = ResponseFactory.createSendResponse();
        const sendNext = ResponseFactory.createSendNext();
        sendResponse.bindResponse(res);
        sendNext.bindNext(next);
        return { sendResponse, sendNext };
    } 
}