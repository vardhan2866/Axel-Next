'use client'
import { VerifyUser } from '@/app/actions/verifyUser'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

function Verification({ params }) {
    const router = useRouter()
    async function verify() {
        try {
            const date = new Date().toISOString()
            const vtoken = params.hashed[0];
            const id = params.hashed[1];
            console.log(vtoken, id)
            const res = await VerifyUser(vtoken, id, date)
            const nres = await JSON.parse(res)
            if (nres.success === true) {
                console.log('redirecting')
                toast.success(nres.message)
                router.push('/login/passwordreset/done')
            } else {
                console.log('redirecting else', nres.message)
                toast.error(nres.message)
                router.push('/verification/failed')
            }
        }catch(error){
            console.log('redirecting catch')
            toast.error(error.message)
            router.push('/verification/failed')
        }
        
    }

    useEffect(() => {
        verify()
    }, [])
    return (
        <div>
            verification page</div>
    )
}

export default Verification