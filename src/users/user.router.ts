/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser } from "./user.interface";
import { UserResource } from "./user.resource";
import { User } from "./user.model";

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
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: UserResource[] = await UserService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// GET items/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
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

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: Required<IBaseUser> = req.body;

    const newUser: UserResource = await UserService.create(user);

    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id

usersRouter.patch("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

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

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await UserService.remove(id);

    res.status(204).send("User deleted.");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
