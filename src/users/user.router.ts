/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser } from "./user.interface";
import { UserResource } from "./user.resource";

/**
 * Router Definition
 */
export const usersRouter = express.Router();
/**
 * Controller Definitions
 */

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
