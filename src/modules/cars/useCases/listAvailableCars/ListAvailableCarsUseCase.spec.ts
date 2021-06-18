import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvaialbleCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvaialbleCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvaialbleCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Aventureiro do Mar!",
            description: "Uma carro que sonha em ir para o oceano!",
            daily_rate: 3250.5,
            license_plate: "OCEAN-00000",
            fine_amount: 50.01,
            brand: "Atlanta",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car1]);
    });

    it("should be able to list all avaiable cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Aventureiro do Ceu!",
            description: "Uma carro que sonha em ir para o ceu!",
            daily_rate: 3250.5,
            license_plate: "SKY-000",
            fine_amount: 50.01,
            brand: "Skyfall",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Skyfall",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaiable cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Aventureiro do Ceu!",
            description: "Uma carro que sonha em ir para o ceu!",
            daily_rate: 3250.5,
            license_plate: "SKY-000",
            fine_amount: 50.01,
            brand: "Skyfall",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Aventureiro do Ceu!",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaiable cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Aventureiro da Terra!",
            description: "Uma carro que não anda???",
            daily_rate: 7777,
            license_plate: "ETH-012",
            fine_amount: 0.77,
            brand: "NotToday",
            category_id: "09876543210",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "09876543210",
        });

        expect(cars).toEqual([car]);
    });
});
