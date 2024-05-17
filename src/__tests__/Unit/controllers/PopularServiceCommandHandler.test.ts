import { SendResponse } from "../../../implementations/SendResponse";
import { SendNext } from "../../../implementations/SendNext";
import { PopularServiceCommandHandler } from "../../../controllers/PopularServiceCommandHandler";
import { PopularServiceCommandManage } from "../../../services/PopularServiceCommandManage";

describe('Handle', () => {
  let sendResponse!: SendResponse;
  let sendNext!: SendNext;
  let commandManageMock!: PopularServiceCommandManage;
  let popularServiceCommandHandlerMock!: PopularServiceCommandHandler;

  beforeAll(() => {
    sendResponse = new SendResponse();
    sendNext = new SendNext();
    commandManageMock = {
      execute: jest.fn()
    } as unknown as PopularServiceCommandManage;

    popularServiceCommandHandlerMock = new PopularServiceCommandHandler(commandManageMock);
    //@ts-ignore
    sendResponseMock = jest.spyOn(SendResponse.prototype, 'send').mockReturnValueOnce(null);
    //@ts-ignore
    sendNextMock = jest.spyOn(SendNext.prototype, 'send').mockReturnValueOnce(null);
  });

  it('should call execute', async () => {
    popularServiceCommandHandlerMock.handle(sendResponse, sendNext);
    expect(commandManageMock.execute).toHaveBeenCalled();
  });

});


