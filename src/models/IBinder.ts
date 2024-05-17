import {Response, NextFunction } from 'express';

export interface IBinder{
   bind(res:Response, next:NextFunction):any
}

