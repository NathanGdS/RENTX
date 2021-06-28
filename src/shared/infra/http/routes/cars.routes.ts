import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const createUploadCarImages = new UploadCarImagesController();

const uploadCarsImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCars.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadCarsImages.array("images"),
    createUploadCarImages.hanlde
);

export { carsRoutes };
