/**
 * Data Model Interfaces
 */
import { IBaseUser, IUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { mapUserToResource, mapUsersToResources } from "./user.resource";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import fs from "fs";

export const addOrUpdateProfileImage = async (
  id: string,
  user: any,
  newProfileImage: string
) => {
  if (user && user.profileImage && user.profileImage !== "images/default.png") {
    try {
      // If a previous profile image exists and is not the default one, delete it, BUT DOESNT RESPOND WITH ERROR
      await fs.promises.unlink(user.profileImage);
    } catch (e) {
      console.error("Old image not found");
    }
  }

  await User.updateOne(
    { _id: id },
    { $set: { profileImage: newProfileImage } }
  );
};

export const login = (body: any, user: IUser): Promise<any> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(body.password, user.password, (err, result) => {
      if (err) {
        reject("Error comparing passwords");
      }

      if (result) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_KEY as string,
          {
            expiresIn: "365d",
          }
        );
        const userResponse = mapUserToResource(user);

        resolve({ user: userResponse, token });
      } else {
        reject("Invalid password");
      }
    });
  });
};

export const register = async (body: any): Promise<any> => {
  const hash = await bcrypt.hash(body.password, 10);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hash,
  });

  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_KEY as string,
    { expiresIn: "1h" }
  );

  const result: any = await user.save();
  const userResponse = { ...result._doc };

  return { user: mapUserToResource(userResponse), token: token };
};

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
  const deleted = User.deleteOne({ _id: id });
  if (!deleted) {
    return null;
  }

  return deleted;
};
