import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findByID(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async list(): Promise<User[]> {
        return this.users;
    }
}

export { UsersRepositoryInMemory };
