import React from "react"
import Link from "next/link"
import authRoute from "../components/HOC/authRoute"

const Dashboard2 = () => {
    return (
        <div>
            <Link href="/dashboard">
                <button type="button">dashboard</button>
            </Link>
        </div>
    )
}

export default authRoute(Dashboard2)
