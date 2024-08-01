import { z } from "zod";
import { getDB } from "../connection";
import { compareTextWithHash, hashText } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";
import { getToken } from "../helpers/jwt";
// import bcrypt from "bcryptjs";

export type UserInput = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserModelCreateInput = Omit<UserInput, "_id">;

type UserLoginInput = {
  username: string;
  password: string;
};

export type UserPayload = {
  id: ObjectId;
  name: string;
  username: string;
};

const UserSchema = z.object({
  name: z.string({
    message: "Name is Required",
  }),
  username: z.string({
    message: "Username is Required",
  }),
  email: z
    .string({
      message: "Email is Required",
    })
    .email({
      message: "Invalid Email",
    }),
  password: z
    .string({
      message: "Password is Required",
    })
    .min(5, { message: "Minimum Password is 5 Characters" }),
});

const LoginSchema = z.object({
  username: z.string({ message: "Please Input your Username" }),
  password: z.string({ message: "Please Input your Password" }),
});

class UserModel {
  static async registerUser(newUser: UserModelCreateInput) {
    UserSchema.parse(newUser);
    const DB = await getDB();
    const checkMail = await DB.collection("Users").findOne({
      email: newUser.email,
    });

    const checkUsername = await DB.collection("Users").findOne({
      username: newUser.username,
    });

    if (checkMail) throw new Error("Email already Exists");
    if (checkUsername) throw new Error("Username already Exists");

    const user: UserModelCreateInput = {
      ...newUser,
      password: hashText(newUser.password),
    };
    const result = DB.collection("Users").insertOne(user);

    return result;
  }

  static async userLogin(user: UserLoginInput) {
    LoginSchema.parse(user);

    const DB = await getDB();
    const findUsername = await DB.collection("Users").findOne({
      username: user.username,
    });

    if (!findUsername) throw new Error("Invalid Username or Password");

    const checkPassword = compareTextWithHash(
      user.password,
      findUsername.password
    );

    if (!checkPassword) throw new Error("Invalid Username or Password");

    const payload: UserPayload = {
      id: findUsername._id,
      name: findUsername.name,
      username: findUsername.username,
    };
    const access_token = getToken(payload);

    return { username: findUsername.username, access_token };
  }

  static async getUserById(id: string) {
    const DB = await getDB();
    const objectId = new ObjectId(id);

    const user = (await DB.collection("Users").findOne(
      { _id: objectId },
      { projection: { password: 0 } }
    )) as UserInput;

    return user;
  }

  static async getUsers(): Promise<UserInput[]> {
    const DB = await getDB();
    const users = (await DB.collection("Users")
      .find()
      .project({ password: 0 })
      .toArray()) as UserInput[];

    return users;
  }
}

export default UserModel;
