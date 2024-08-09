"use server"

import mailer from "../utils/mailer"
import User from "@/models/User"
const { NextResponse } = require("next/server")


export async function handlReset(e) {
    try {

        // return true;
        console.log(e)   
        // const nex = {name : 'derm', success : true}
        // console.log(nex)
        // return JSON.stringify(nex)
        const userExists = await User.findOne({ email: e.em})
        // const userExists = false
        console.log(userExists)
        
        if (!userExists) {
            return JSON.stringify({
                message: "email doesn't exists",
                success: false,
            })
        }
        
        const mail = mailer({email : e.em, emailType : 'ForgotPassword', id : userExists._id})
        // const mail = mailer(e.em, 'ForgotPassword', userExists._id);
        console.log(mail)

        return JSON.stringify({
            message: "verification mail sent successfully",
            success: true
        })

    } catch (error) {
        console.log(error)

        return JSON.stringify({
            message: error.message,
            success: false
        })

    }
}