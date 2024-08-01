import UserModel from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();    
    const data = await UserModel.userLogin(body);
    console.log(body);
    

    return NextResponse.json(
      {
        message: `Success Login with User ${data.username}`,
        data
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
        status: 500
      }
    );
  }
}