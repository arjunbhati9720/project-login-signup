import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";

// connecting to the database
connect()

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { userName, email, password } = reqBody;
        // console.log(reqBody);

        // check if the user is already exists
        const user = await User.findOne({ $or: [{ userName }, { email }] });

        if (user) {
            return NextResponse.json({ error: 'User with this userName or email already exists' }, { status: 400 });
        }

        // create a new user
        const newUser = new User({ userName, email, password });

        // saving a new user
        const savedUser = await newUser.save();
        console.log(savedUser);

        // send the response
        return NextResponse.json({ message: 'User created Successfully', success: true, savedUser }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}