import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listSpecificationsUseCase = container.resolve(
                ListSpecificationsUseCase
            );

            const all = await listSpecificationsUseCase.execute();

            return response.status(200).json(all);
        } catch (e) {
            return response.status(400);
        }
    }
}

export { ListSpecificationController };
