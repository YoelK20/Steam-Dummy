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
}

export type UserPayload = {
  id: ObjectId;
  name: string;
  username: string;
}

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

const LoginSchema = z.object({ username: z.string({ message: "Please Input your Username" }), password: z.string({ message: "Please Input your Password" }) })

class UserModel {
  static async registerUser(newUser: UserModelCreateInput) {
    UserSchema.parse(newUser);
    const DB = await getDB()
    const checkMail = await DB.collection("Users").findOne({
      email: newUser.email,
    });

    const checkUsername = await DB.collection("Users").findOne({
      username: newUser.username,
    });

    if (checkMail) throw new Error("Email already Exists");
    if (checkUsername) throw new Error("Username already Exists");

    const user : UserModelCreateInput = {
      ...newUser,
      password : hashText(newUser.password)
    }
    const result = DB.collection("Users").insertOne(user);

    return result;
  }

  
}

export default UserModel;
