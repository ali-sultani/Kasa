import { Request } from 'express'

export class CreateServiceCommand {

    private nomService!: string;
    private nomCategorie!: string;
    private image!: string;

    constructor() {
    }

    public getNomService(): string {
        return this.nomService;
    }

    public getNomCategorie(): string {
        return this.nomCategorie;
    }

    public getImage(): string {
        return this.image;
    }

    public setCommandBody(req: Request) {
        this.nomService = req.body.nom_service;
        this.nomCategorie = req.body.nom_cat;
        this.image = req.body.image;
    }
}
