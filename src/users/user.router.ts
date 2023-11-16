/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser } from "./user.interface";
// import { BaseItem, Item } from "./item.interface";
/**
 * Router Definition
 */
export const usersRouter = express.Router();
/**
 * Controller Definitions
 */

// // GET items
// itemsRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const items: Item[] = await ItemService.findAll();

//     res.status(200).send(items);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
// // GET items/:id
// itemsRouter.get("/:id", async (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);

//   try {
//     const item: Item = await ItemService.find(id);

//     if (item) {
//       return res.status(200).send(item);
//     }

//     res.status(404).send("item not found");
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });

// POST items

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: IBaseUser = req.body;

    const newItem = await UserService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// // PUT items/:id

// itemsRouter.patch("/:id", async (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);

//   try {
//     const itemUpdate: Item = req.body;

//     const existingItem: Item = await ItemService.find(id);

//     if (existingItem) {
//       const updatedItem = await ItemService.update(id, itemUpdate);
//       return res.status(200).json(updatedItem);
//     }

//     const newItem = await ItemService.create(itemUpdate);

//     res.status(201).json(newItem);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });

// // DELETE items/:id

// itemsRouter.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id, 10);
//     await ItemService.remove(id);

//     res.sendStatus(204);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
