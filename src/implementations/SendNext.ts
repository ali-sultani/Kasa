import { NextFunction } from "express";
import { INext } from "../models/INext";

export class SendNext implements INext {
    private next!: NextFunction;

    constructor(){}

    bindNext(next: NextFunction) {
        this.next = next;
    }

    send(value: any) {
        this.next(value);
    }    
}