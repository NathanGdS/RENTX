import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or passowrd incorrect!");
        }

        const passMatch = await compare(password, user.password);

        if (!passMatch) {
            throw new AppError("Email or passowrd incorrect!");
        }

        const token = sign({}, "b4ddc8b02b9225adefaf038e65036138", {
            subject: user.id,
            expiresIn: "1d",
        });

        const userInfo: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };

        return userInfo;
    }
}

export { AuthenticateUserUseCase };
