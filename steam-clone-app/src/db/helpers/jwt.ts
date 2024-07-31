import * as jwt from "jsonwebtoken"
import { UserPayload } from "../models/User";
const secretKey = process.env.SECRET_KEY

if (!secretKey) {
    throw new Error("SECRET_KEY is not defined");
  }

export const getToken = (payload: UserPayload) => {
    return jwt.sign(payload, secretKey)
}

export const verifyToke = (token: string) => jwt.verify(token, secretKey)