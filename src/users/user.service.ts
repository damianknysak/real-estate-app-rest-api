/**
 * Data Model Interfaces
 */
import { IBaseUser, IUser, IUsers } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";

/**
 * Service Methods
 */

// export const findAll = async (): Promise<Item[]> => Object.values(items);

// export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newUser: IBaseUser): Promise<any> => {
  const book = new User({
    _id: new mongoose.Types.ObjectId(),
    ...newUser,
  });

  const result = await book.save();
  return result;
};

// export const update = async (
//   id: number,
//   itemUpdate: BaseItem
// ): Promise<Item | null> => {
//   const item = await find(id);

//   if (!item) {
//     return null;
//   }

//   items[id] = { id, ...itemUpdate };

//   return items[id];
// };

// export const remove = async (id: number): Promise<null | void> => {
//   const item = await find(id);

//   if (!item) {
//     return null;
//   }

//   delete items[id];
// };
