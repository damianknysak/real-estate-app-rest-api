/**
 * Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from "express";
import * as PropertyService from "./property.service";
import { checkAuth } from "../middleware/check-auth.middleware";
import multer from "multer";
import { IProperty } from "./property.interface";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

/**
 * Router Definition
 */
export const propertiesRouter = express.Router();
/**
 * Controller Definitions
 */

propertiesRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const items = await PropertyService.findAllProperties();
    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

propertiesRouter.get("/:id", checkAuth, async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const item = await PropertyService.findProperty(id);
    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("property not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

propertiesRouter.post(
  "/",
  checkAuth,
  upload.array("image", 5),
  async (req: Request, res: Response) => {
    try {
      const property: IProperty = req.body;
      const userId = (req as any).userData.userId;

      const newProfileImages: string[] =
        req.files && (req as any)["files"].map((file: any) => file.path);
      if (property && newProfileImages) {
        const newProperty = await PropertyService.createProperty(
          property,
          newProfileImages,
          userId
        );
        return res.status(201).json(newProperty);
      }
      res.status(403).send("Wrong Request");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

propertiesRouter.patch(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      const propertyUpdate: any = req.body;
      const updatedProperty = await PropertyService.updateProperty(
        id,
        propertyUpdate
      );

      if (updatedProperty) {
        return res.status(200).json(updatedProperty);
      }

      res.status(404).send("property not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

propertiesRouter.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      await PropertyService.removeProperty(id);
      res.status(204).send("Property deleted.");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
