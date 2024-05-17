import { faker } from "@faker-js/faker";
import { CreateServiceCommandHandler } from "../../../controllers/CreateServiceCommandHandler";
import { CreateServiceCommand } from "../../../models/Command/CreateServiceCommand";
import { CreateServiceCommandManage } from "../../../services/CreateServiceCommandManage";
import { SendResponse } from "../../../implementations/SendResponse";
import { SendNext } from "../../../implementations/SendNext";

describe('Handle', () => {

  let commandManageMock!: CreateServiceCommandManage;
  let createServiceCommandMock!: CreateServiceCommand;
  let createServiceCommandHandlerMock!: CreateServiceCommandHandler;
  let sendResponse!: SendResponse;
  let sendNext!: SendNext;
  let serviceName!: any;
  let nomCategorie!: any;
  let image!: any;


  beforeAll(() => {
    sendResponse = new SendResponse();
    sendNext = new SendNext();
    serviceName = faker.person.fullName();
    nomCategorie = faker.person.fullName();
    image = faker.image.dataUri();

    commandManageMock = {
      execute: jest.fn()
    } as unknown as CreateServiceCommandManage;

    createServiceCommandMock = {
      getNomService: () => serviceName,
      getNomCategorie: () => nomCategorie,
      getImage: () => image
    } as unknown as CreateServiceCommand;

    createServiceCommandHandlerMock = new CreateServiceCommandHandler(commandManageMock);
    //@ts-ignore
    sendResponseMock = jest.spyOn(SendResponse.prototype, 'send').mockReturnValueOnce(null);
    //@ts-ignore
    sendNextMock = jest.spyOn(SendNext.prototype, 'send').mockReturnValueOnce(null);
  })
  describe('Given createServiceCommand', () => {

    it('should call execute with right parameters', async () => {
      createServiceCommandHandlerMock.handle(createServiceCommandMock, sendResponse, sendNext);
      expect(commandManageMock.execute).
        toHaveBeenCalledWith(createServiceCommandMock.getNomService(), createServiceCommandMock.getNomCategorie(), createServiceCommandMock.getImage())
    })

  });

});


