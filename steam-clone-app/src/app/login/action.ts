"use server"

import { compareTextWithHash } from "@/db/helpers/bcrypt";
import { getToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"

export async function doLogin (form: FormData){
    const loginSchema = z.object({
        username: z.string(),
        password: z.string()
    });

    const username = form.get("username")
    const password = form.get("password")

    const parsedData = loginSchema.safeParse({
        username,
        password
    })

    // console.log(parsedData);
    

    if(!parsedData.success) {
        const errPath = parsedData.error.issues[0].path[0]
        const errMesage = parsedData.error.issues[0].message;
        const errFinalMessage = `${errPath}-${errMesage}`

        return redirect(`http://localhost:3000/login?error=${errFinalMessage}`)
    }

    const user = await UserModel.getUserByUsername(parsedData.data.username)
    console.log(user);
    
    if(!user || !compareTextWithHash(parsedData.data.password, user.password)){
        return redirect (`http://localhost:3000/login?error=Invalid%20credentials`)
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

    return redirect(`http://localhost:3000/`)
}