import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { password, email } = request.body;

            const authenticateUserUseCase = container.resolve(
                AuthenticateUserUseCase
            );

            const token = await authenticateUserUseCase.execute({
                password,
                email,
            });

            return response.json(token);
        } catch (e) {
            return response.status(403).json({ error: e.message });
        }
    }
}

export { AuthenticateUserController };
