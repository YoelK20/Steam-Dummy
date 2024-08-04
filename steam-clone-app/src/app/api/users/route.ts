import UserModel from "@/db/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userData = await UserModel.getUsers();
    return NextResponse.json({
      status: 200,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 400,
      message: error
    })
    
  }
}
