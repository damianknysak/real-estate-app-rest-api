import { IUser } from "./user.interface";

export type UserResource = Pick<
  IUser,
  "_id" | "email" | "firstName" | "lastName" | "profileImage"
>;

export const mapUserToResource = (user: IUser): UserResource => {
  return {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
  };
};

export const mapUsersToResources = (users: IUser[]): UserResource[] => {
  const userResources = users.map((user) => mapUserToResource(user));
  return userResources;
};
