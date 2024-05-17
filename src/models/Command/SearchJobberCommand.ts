import { Request } from 'express'

export class SearchJobberCommand {

    /*private numService!: string;
    private addresse!: string;
    private time!: string;
    private dateDebut!: string;*/

    private numService!: string;
    private codePostal!: string;
    private ville!: string;
    private dateHeure!: Date;
    private exigences!: string[];

    constructor() {
    }

    public setCommandBody(req: Request) {
        this.numService = req.body.numService;
        const codePostaletAdresse = this.extractCity(req.body.address);
        this.codePostal = codePostaletAdresse?.codePostal || "";
        this.ville = codePostaletAdresse?.ville || "";
        this.dateHeure = new Date(`${req.body.dateDebut}T${req.body.time}`);
        this.exigences = req.body.exigences;
    }

    private extractCity(address: string): { ville: string, codePostal: string } | undefined {
        // Regular expression pattern to match city and postal code
        const pattern = /,\s*([^,]+),\s*QC\s*([A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]),\s*Canada$/;

        // Executing the regular expression
        const matches = pattern.exec(address);

        if (matches && matches.length === 3) {
            const ville = matches[1];
            const codePostal = matches[2];
            
            return { ville, codePostal };
        } else {
            console.log("Unable to extract city and postal code from the address.");
        }
    }

    public getNumService(): string {
        return this.numService;
    }

    public getCodePostal(): string {
        return this.codePostal;
    }

    public getVille(): string {
        return this.ville;
    }

    public getDateHeure(): Date {
        return this.dateHeure;
    }

    public getExigences(): string[] {
        return this.exigences;
    }
}
