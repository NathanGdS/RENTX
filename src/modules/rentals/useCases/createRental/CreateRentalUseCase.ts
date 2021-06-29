import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHours = 24;

        const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnAvailable) {
            throw new AppError("Car is unavailable!");
        }

        const rentalOpenedForUser =
            await this.rentalsRepository.findByOpenRentalByUser(user_id);

        if (rentalOpenedForUser) {
            throw new AppError(
                "There's a another rental in progress for this user!"
            );
        }
        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumHours) {
            throw new AppError(
                `The minium hours to a rental it is ${minimumHours} hours!`
            );
        }

        const rental = this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
