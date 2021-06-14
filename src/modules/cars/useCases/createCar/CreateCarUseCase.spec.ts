import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name",
            description: "Description",
            daily_rate: 1000,
            license_plate: "ABC093",
            fine_amount: 60,
            brand: "Brand",
            category_id: "categoryId",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car that already exists!", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name 1",
                description: "Description",
                daily_rate: 1000,
                license_plate: "ABC093",
                fine_amount: 60,
                brand: "Brand",
                category_id: "categoryId",
            });

            await createCarUseCase.execute({
                name: "Name 2",
                description: "Description",
                daily_rate: 1000,
                license_plate: "ABC093",
                fine_amount: 60,
                brand: "Brand",
                category_id: "categoryId",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Must be able to create a car with avaiable true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Avaiable",
            description: "Description",
            daily_rate: 1000,
            license_plate: "ABC193",
            fine_amount: 60,
            brand: "Brand",
            category_id: "categoryId",
        });

        expect(car.available).toBe(true);
    });
});
