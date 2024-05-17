import {NextFunction, Response } from 'express';


export interface INext{
   send(value:any):any;
   bindNext(next:NextFunction):any
}

