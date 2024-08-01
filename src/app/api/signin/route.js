import dbconnection from '@/helper/db';
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    dbconnection()
    try{
        const data = await req.json()
        console.log(data)

        const user = await User.findOne({ email: data.email })
        console.log(user)
        if (!user) {
            return NextResponse.json({
                message: "Register Yourself",
                success: false,
            }, { status: 200 })
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            return NextResponse.json({
                message: "Invalid mail or password",
                success: false,
            }, { status: 200 })
        }


        const token = await jwt.sign({id : user._id}, process.env.SECRET_KEY, { expiresIn: '1d' });
        
        // Response.cookies.set("token", token);
        const res = NextResponse.json({
            token: token,
            message: "Login successful",
            success: true
        }, { status: 200 }); 

        res.cookies.set('token', token)
        return res;
    }catch(error){
        // console.log("catch error")
        return NextResponse.json({
            message : "Internal server error",
            success : false
        }, {status : 500})
    }
}