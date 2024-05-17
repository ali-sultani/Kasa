import express from "express";
import { ROUTER_PATH } from '../data/RouterPath';
import { JetonTest } from "../Helpers/JetonTest";
import { Request, Response, NextFunction } from 'express';
import { createServiceCommand, createServiceCommandHandler } from '../features/CreateServiceFeature';
import { binder, validationInput } from "../features/HelperFeature";
import { popularServiceCommandHandler } from "../features/PopularServiceFeature";
import { homePageController } from "../features/HomePageFeature";
import { createServiceDetailsRequest, serviceDetailsController, serviceDetailsValidator } from "../features/ServiceDetailsFeature";
import { searchContentController } from "../features/SearchContentFeature";
import { categoryDataController } from "../features/CategoryDataFeature";
import { searchJobberCommand, searchJobberController } from "../features/SearchJobberFeature";
import { jobberCompetenceController } from "../features/JobberCompetenceFeature";
import { verifyJWT } from "../middlewares/VerifyAuthentification";

const router = express.Router();

router.get(ROUTER_PATH.popularService, async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    await popularServiceCommandHandler.handle(sendResponse, sendNext);
});

router.get(ROUTER_PATH.detailService, serviceDetailsValidator.serviceDetailsValidationRules(), async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    const serviceDetailsRequest = createServiceDetailsRequest();
    serviceDetailsRequest.setRequestParams(req.params);
    await serviceDetailsController.getServiceDetails(serviceDetailsRequest, sendResponse, sendNext);
});

router.post(ROUTER_PATH.creerService, validationInput, async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    createServiceCommand.setCommandBody(req);
    await createServiceCommandHandler.handle(createServiceCommand, sendResponse, sendNext);
});

router.get(ROUTER_PATH.accueil, async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    await homePageController.getHomePageData(sendResponse, sendNext);
});

router.get(ROUTER_PATH.rechercherContenu, async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    await searchContentController.searchContent(req.params.motcle, sendResponse, sendNext);
});

router.get(ROUTER_PATH.categoryData, async (req: Request, res: Response, next: NextFunction) => {
    const { sendNext, sendResponse } = binder.bind(res, next);
    await categoryDataController.getCategoryData(req.params.numCategorie, sendResponse, sendNext);
});

router.post(ROUTER_PATH.searchJobber, async (req: Request, res: Response, next: NextFunction)=>{
    const { sendNext, sendResponse } = binder.bind(res, next);
    searchJobberCommand.setCommandBody(req);
    await searchJobberController.searchJobber(searchJobberCommand, sendResponse, sendNext);
});

router.post(ROUTER_PATH.enregistrerCompetence, async (req: Request, res: Response, next: NextFunction)=>{
    const { sendNext, sendResponse } = binder.bind(res, next);
    await jobberCompetenceController.addCompetence(req.body.numJobber, req.body.numService, req.body.exigences, sendResponse, sendNext);
});

router.get(ROUTER_PATH.jetonTest, verifyJWT, (req, res) => {
    return res.status(200).json({ msg: "Requete avec token : success" });
  });

export { router}