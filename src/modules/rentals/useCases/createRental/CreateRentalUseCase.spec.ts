import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayPlusOne = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayPlusOne,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Shouldn't be able to create a new rental when user already have an open rental", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayPlusOne,
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12121244",
                expected_return_date: dayPlusOne,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Shouldn't be able to create a new rental when already exists an open rental to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayPlusOne,
            });

            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "121212",
                expected_return_date: dayPlusOne,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Shouldn't be able to create a new rental with less then 24 hours", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "test",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
