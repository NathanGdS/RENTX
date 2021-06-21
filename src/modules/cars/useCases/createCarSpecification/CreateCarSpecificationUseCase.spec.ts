import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("should be able to create a car's specification", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name",
            description: "Description",
            daily_rate: 1000,
            license_plate: "ABC093",
            fine_amount: 60,
            brand: "Brand",
            category_id: "categoryId",
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specifications_id = [specification.id];

        const specificationCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationCar).toHaveProperty("specifications");
        expect(specificationCar.specifications.length).toBe(1);
    });

    it("shouldn't be able to create a car's specification if the car doensn't exists", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["12345"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
