"use server"

import dbconnection from "@/helper/db"
import mailer from "../utils/mailer"
import User from "@/models/User"
const { NextResponse } = require("next/server")


export async function handlReset(e) {
    try {
        dbconnection()
        // return true;
        console.log(e)   
        // const nex = {name : 'derm', success : true}
        // console.log(nex)
        // return JSON.stringify(nex)
        const temp = {email : e.em}
        console.log(temp)
        const userExists = await User.findOne(temp)
        // const userExists = false
        
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