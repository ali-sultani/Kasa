import { CreateServiceCommandManage } from '../services/CreateServiceCommandManage';
import { HttpStatusCode } from '../data/HttpStatusCode';
import { CreateServiceCommand } from '../models/Command/CreateServiceCommand';
import { SendResponse } from '../implementations/SendResponse';
import { SendNext } from '../implementations/SendNext';

export class CreateServiceCommandHandler {
    constructor(private commandManage: CreateServiceCommandManage) {}

    public async handle(command: CreateServiceCommand, sendResponse: SendResponse, sendNext: SendNext) {
        try {
            return await this.commandManage.
                execute(command.getNomService(), command.getNomCategorie(), command.getImage()).then(() => {
                    return sendResponse.send(HttpStatusCode.statutCreated, {});
                });
        }
        catch (err) {
            sendNext.send(err);
        }
    }

}
