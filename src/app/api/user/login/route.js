import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";

// connecting to the database
connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({ email });
        if (!user) { return NextResponse.json({ error: "User does not exist" }, { status: 400 }) }

        // check if the password is correct
        let validUser = false;
        if (password === user.password) {
            validUser = true;
        }
        if (!validUser) { return NextResponse.json({ error: "Invalid Password" }, { status: 400 }) }

        const userData = {
            id: user._id,
            email: user.email,
            username: user.username
        }


        // creating a response
        const response = NextResponse.json({
            message: "login success",
            data:userData,
            success: true
        });
        console.log(response)
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}