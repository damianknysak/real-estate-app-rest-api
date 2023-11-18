/**
 * Data Model Interfaces
 */
import { IBaseUser, IUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { mapUserToResource, mapUsersToResources } from "./user.resource";

/**
 * Service Methods
 */

export const findAll = async (): Promise<any> => {
  const users: any = await User.find();
  if (users) {
    return mapUsersToResources(users);
  }
  return null;
};

export const find = async (id: string): Promise<any> => {
  const user: any = await User.findOne({ _id: id });
  if (user) {
    return mapUserToResource(user);
  }
  return null;
};

export const create = async (newUser: IBaseUser): Promise<any> => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...newUser,
  });

  const result: any = await user.save();
  return mapUserToResource(result);
};

export const update = async (
  id: string,
  userUpdate: {
    firstName: string | undefined;
    lastName: string | undefined;
    profileImage: string | undefined;
  }
): Promise<any> => {
  let user = await find(id);

  const updatedUser: any = await User.findOneAndUpdate(
    { _id: id },
    { $set: { ...userUpdate } },
    { returnOriginal: false }
  );

  if (!updatedUser) {
    return null;
  }

  return mapUserToResource(updatedUser);
};

export const remove = async (id: string): Promise<any> => {
  const user = User.find({ _id: id });
  const deleted = User.deleteOne({ _id: id });
  if (!deleted) {
    return null;
  }

  return deleted;
};
