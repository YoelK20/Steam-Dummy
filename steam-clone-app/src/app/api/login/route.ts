import { baseUrl } from "@/db/helpers/BaseUrl";
import { compareTextWithHash } from "@/db/helpers/bcrypt";
import { getToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = await body;
    const data = await UserModel.userLogin(body);
    console.log(body);
    const loginSchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const parsedData = loginSchema.safeParse({
      username,
      password,
    });

    if(!parsedData.success) {
      const errPath = parsedData.error.issues[0].path[0]
      const errMesage = parsedData.error.issues[0].message;
      const errFinalMessage = `${errPath}-${errMesage}`

      return redirect(`${baseUrl}/login?error=${errFinalMessage}`)
  }
  const user = await UserModel.getUserByUsername(username)
  if(!user || !compareTextWithHash(parsedData.data.password, user.password)){
    return redirect (`${baseUrl}/login?error=Invalid%20credentials`)
}

const payload = {
    id: user._id,
    username: user.username,
    name: user.name
}

const token = getToken(payload)

cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict"
})

    return NextResponse.json(
      {
        message: `Success Login with User ${data.username}`,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
