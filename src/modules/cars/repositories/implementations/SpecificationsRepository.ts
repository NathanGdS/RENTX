import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    public constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = await this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    async list(): Promise<Specification[]> {
        const list = await this.repository.find();
        return list;
    }
}

export { SpecificationsRepository };
