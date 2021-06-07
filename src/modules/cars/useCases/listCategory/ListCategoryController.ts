import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listCategoryUseCase = container.resolve(ListCategoryUseCase);

            const all = await listCategoryUseCase.execute();

            return response.json(all);
        } catch (e) {
            return response.status(400).json({ error: e.message });
        }
    }
}

export { ListCategoryController };
