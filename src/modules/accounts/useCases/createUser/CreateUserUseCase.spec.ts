import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",
            password: "1234",
            driver_license: "000321",
        };

        await createUserUseCase.execute(user);
        const userCreated = await usersRepositoryInMemory.findByEmail(
            user.email
        );

        expect(userCreated).toHaveProperty("id");
    });

    it("should not be able to create a user that already exists", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                email: "user@test.com",
                password: "1234",
                driver_license: "000321",
            };

            await createUserUseCase.execute(user);
            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });
});
