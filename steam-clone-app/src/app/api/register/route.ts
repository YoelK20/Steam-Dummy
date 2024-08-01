import UserModel from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()    
    const result = await UserModel.registerUser(body);
    // console.log(result);
    

    return NextResponse.json(
      {
        message: `Success Register User ${body.username}`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);  
    return NextResponse.json(
      {
        message: error
      },
      {
        status: 500
      }
    );
  }
}
