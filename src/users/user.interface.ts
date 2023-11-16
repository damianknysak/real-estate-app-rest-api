export interface IBaseUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  password: string;
}

export interface IUser extends IBaseUser {
  _id: string;
}

export interface IUsers {
  [key: number]: IUser;
}
