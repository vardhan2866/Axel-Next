import mailer from "@/app/utils/mailer";
import dbconnection from "@/helper/db";
import User from "@/models/User";
import { message } from "antd";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

async function POST(req) {
    dbconnection();
    try {
        const data = await req.json();

        const userExists =  await User.findOne({email:data.email});

        if (userExists) {
            return NextResponse.json(
                { message: "email already exists", success:false },
                { statusCode: 409 }
            );
        }

        if(data.password !== data.confirmpassword ){
            return NextResponse.json({
                message : "password doesn't matched",
                success : false
            },{status : 200})
        }

        const password = data.password;

        const salt = await bcrypt.genSalt(10);

        const hpwd = await bcrypt.hash(password, salt);

        data.password = hpwd;

        console.log(hpwd);
        const newUser = new User(data);

        await newUser.save();

        if(true){
            console.log('mailer here ')
            const temp = mailer({email:data.email, emailType:"Verify", id: newUser._id});

            console.log(temp)
            
        }

        return NextResponse.json(
            {
                data: data,
                message: "saved",
                success: true,
            },
            { statusCode: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error,
                success : false,
                message: "Internal server error",
            },
            { statusCode: 500 }
        );
    }
}

export { POST };
