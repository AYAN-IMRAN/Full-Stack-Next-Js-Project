import { ConnectToDB } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextResponse, NextRequest } from "next/server";


export async function POST(requst: NextRequest) {
    try {
        const { email, password } = await requst.json()

        if (!email || !password) {
            return NextResponse.json({
                error: "Please add email ,password"

            },

                {
                    status: 400
                })
        }


        await ConnectToDB()

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                error: "You are Already Registered"
            },
        {status:400})
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json({
            mssg:"User Created Succesfully"
        },

        {
            status:200
        }
   
    )
    } catch (error) {
 console.error("Registration error", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
    }

}