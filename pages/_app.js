import React from "react"
import App from "next/app"
import axiosDefault from "axios/lib/defaults"
import router from "next/router"
import AuthHandler from "../lib/authHandler"

axiosDefault.baseURL = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.BACKEND_PORT}/api`

const Root = props => {
    const { Component, pageProps, isAuthenticated } = props

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...pageProps} isAuthenticated={isAuthenticated} />
    )
}

Root.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext)

    const isAuthenticated = await AuthHandler.isAuthenticated(
        appContext.ctx,
        router
    )

    if (process.browser) {
        console.log(`[${new Date()}]--> Request from client`)
    } else {
        console.log(`[${new Date()}]--> Request from server`)
    }

    return { ...appProps, isAuthenticated }
}

export default Root
