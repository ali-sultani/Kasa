export class ServiceDetailsRequest {
  private idService!: string;

  constructor() {}

  getIdService(): string {
    return this.idService;
  }

  setRequestParams(params: any) {
    this.idService = params.idService;
  }
}