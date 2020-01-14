import React from "react"
import Link from "next/link"
import Router from "next/router"
import authRoute from "../components/HOC/authRoute"
import AuthHandler from "../lib/authHandler"

const Dashboard = () => {
    const logout = async () => {
        const logoutRes = await AuthHandler.logout()

        const { status } = logoutRes

        if (status === "success") {
            Router.push("/login")
        }
    }
    return (
        <div>
            <Link href="/dashboard2">
                <button type="button">dashboard2</button>
            </Link>
            <Link href="/change-password">
                <button type="button">Jelszó megváltoztatás</button>
            </Link>
            <button type="button" onClick={logout}>
                logout
            </button>
        </div>
    )
}

export default authRoute(Dashboard)
