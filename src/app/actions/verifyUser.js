"use server"
import dbconnection from "@/helper/db"
import User from "@/models/User"
import { message } from "antd"
import { userAgentFromString } from "next/server"

export async function VerifyUser(vtoken, id, date) {
    try {
        dbconnection()
        console.log('verification invoking', typeof(vtoken))
        id = decodeURIComponent(id)     // coz the URI at server comes in decoded form
        const user =  await User.findById({ _id: id })
        const ddate = new Date(user.tokenValidity).toISOString() // the date on mongo is stored in BSON format and inorder to make date comparison this is done

        console.log(user.tokenValidity)

        vtoken = decodeURIComponent(vtoken)

        

        if(!user){
            return JSON.stringify({success : false,
                message : `user doesn't exists`
            })
        }

        if(user.isVerified){
            return JSON.stringify({
                success : false,
                message : 'user has already verified itself'
            })
        }

        if(date > ddate){
            //router.push('/verification/failed')
            return JSON.stringify({
                success : false,
                message : 'token expired'
            })
        }

        if(vtoken !== user.forgotPasswordToken){
            return JSON.stringify({
                message : `token didn't matched`,
                success : false
            })
        }

        await User.findByIdAndUpdate({_id : id}, {isVerified : true})
        return JSON.stringify({
            success : true,
            message : 'this is true'
        })
    } catch (error) {
        console.log(error.message)
        return JSON.stringify({
            success: false,
            message: 'Internal server error'
        })
    }


};


// switch (true) {
//     case (user === undefined):
//         console.log('verification user')
//         return JSON.stringify({
//             success: false,
//             message: `user doesn't exists`
//         })
//         break;

//     case (date > ddate):
//         console.log('verification time')
//         return JSON.stringify({
//             success: false,
//             message: 'token expired'
//         })
//         break;

//     case (vtoken !== user.forgotPasswordToken):
//         console.log('verification token', vtoken, user.forgotPasswordToken)
//         return JSON.stringify({
//             message: `token didn't matched`,
//             success: false
//         })
//         break;

//     default:
//         console.log('verification success')
//         // user.isVerified = true;
//         // await user.save()
//         return JSON.stringify({
//             success: true,
//             message: 'verification done'
//         })
//         break;

// }