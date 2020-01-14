import React, { useEffect, useState } from "react"
import Router from "next/router"
import axios from "axios"

const VerifyEmail = () => {
    const [message, setMessage] = useState()

    useEffect(() => {
        const verifyEmail = async () => {
            const { token } = Router.router.query

            try {
                const res = await axios.get(
                    `http://${process.env.HOST}:${process.env.BACKEND_PORT}/api/users/verify-email/${token}`
                )

                setMessage(res.data.message)
            } catch (error) {
                setMessage(error.response.data.message)
            }
        }

        verifyEmail()
    }, [])

    return <div>{message}</div>
}

export default VerifyEmail
