/**
 * Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser } from "./user.interface";
import { UserResource } from "./user.resource";
import { User } from "./user.model";
import { checkAuth } from "../middleware/check-auth.middleware";
import multer from "multer";

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
export const usersRouter = express.Router();
/**
 * Controller Definitions
 */

usersRouter.post("/login", async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password)
      res.status(403).send("Wrong query. Send email and password.");
    const user: any = await User.findOne({ email: req.body.email });
    if (user) {
      const items = await UserService.login(req.body, user);
      res.status(200).send(items);
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.post("/register", async (req: Request, res: Response) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName
    )
      res.status(403).send("Wrong query.");
    const emailUsed: any = await User.findOne({ email: req.body.email });
    if (!emailUsed) {
      const items = await UserService.register(req.body);
      res.status(200).send(items);
    } else {
      return res.status(409).send("Email is already in use");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items
usersRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const items: UserResource[] = await UserService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// GET items/:id
usersRouter.get("/:id", checkAuth, async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const item: UserResource = await UserService.find(id);
    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("user not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items

usersRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const user: Required<IBaseUser> = req.body;

    const newUser: UserResource = await UserService.create(user);

    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items

usersRouter.post(
  "/add-profile-image",
  checkAuth,
  upload.single("image"),
  async (req: any, res: Response) => {
    try {
      const id = req.userData.userId;
      const newProfileImage = req.file && req.file.path;

      // Check if a previous profile image exists
      const user = await User.findOne({ _id: id });
      if (user) {
        UserService.addOrUpdateProfileImage(id, user, newProfileImage);
      } else {
        return res.status(404).json({
          message: `User not found`,
        });
      }

      return res.status(200).json({
        message: `Image added`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  }
);

// PUT items/:id

usersRouter.patch("/:id", checkAuth, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (id != req.body.userData.userId) {
    res.status(401).send("You are not this user");
  }
  try {
    const userUpdate: Required<{
      firstName: string | undefined;
      lastName: string | undefined;
      profileImage: string | undefined;
    }> = req.body;

    const updatedUser: UserResource | null = await UserService.update(
      id,
      userUpdate
    );
    if (updatedUser) return res.status(200).json(updatedUser);

    res.status(404).send("user not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

usersRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (id != req.body.userData.userId) {
    res.status(401).send("You are not this user");
  }
  try {
    await UserService.remove(id);

    res.status(204).send("User deleted.");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
