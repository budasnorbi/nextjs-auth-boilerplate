/* eslint-disable class-methods-use-this */

import jwt from "jsonwebtoken"
import axios from "axios"
import cookies from "next-cookies"

class AuthHandler {
    constructor() {
        this.accessToken = null

        this.setAccessToken = this.setAccessToken.bind(this)
        this.getAccessToken = this.getAccessToken.bind(this)
        this.getPublicKey = this.getPublicKey.bind(this)
        this.verifyAccessToken = this.verifyAccessToken.bind(this)
        this.getNewAccessToken = this.getNewAccessToken.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

        // this.forgetPassword = this.forgetPassword.bind(this)
        // this.resetPassword = this.resetPassword.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    async changePassword(credentials) {
        try {
            const changePasswordRes = await axios.post(
                "/users/change-password-inside",
                credentials,
                {
                    headers: {
                        Authorization: this.getAccessToken(),
                    },
                }
            )

            return changePasswordRes.data
        } catch (error) {
            return error.response.data
        }
    }

    async resetPassword(credentials, token) {
        try {
            const resetPasswordRes = await axios.post(
                `/users/change-password-outside/${token}`,
                credentials
            )

            return resetPasswordRes.data
        } catch (error) {
            return error.response.data
        }
    }

    async forgetPassword(credentials) {
        try {
            const forgetPasswordRes = await axios.post(
                "/users/forget-password",
                credentials
            )

            return forgetPasswordRes.data
        } catch (error) {
            return error.response.data
        }
    }

    async login(credentials) {
        try {
            const loginRes = await axios.post(`/users/login`, credentials, {
                withCredentials: true,
            })

            const { accessToken } = loginRes.data

            this.setAccessToken(accessToken)

            return loginRes.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {
                      status: "error",
                      message: "Szerver hiba",
                  }
        }
    }

    async logout() {
        try {
            await this.isAuthenticated()

            const logoutRes = await axios.get(`/users/logout`, {
                withCredentials: true,
                headers: {
                    Authorization: this.getAccessToken(),
                },
            })

            this.setAccessToken(null)
            return logoutRes.data
        } catch (error) {
            return error
        }
    }

    setAccessToken(token) {
        this.accessToken = token
    }

    getAccessToken() {
        return this.accessToken
    }

    async getPublicKey() {
        try {
            const res = await axios.get(`/token/publicToken`)
            return res.data
        } catch (error) {
            return false
        }
    }

    async verifyAccessToken(token) {
        if (!token) {
            return false
        }

        try {
            const publicKey = await this.getPublicKey()

            const { jwti } = jwt.decode(token.slice(7, token.length))

            const decodedVerify = jwt.verify(
                token.slice(7, token.length),
                publicKey + jwti
            )

            if (!decodedVerify) {
                return false
            }

            const expiresAt = decodedVerify.exp * 1000

            return !(Date.now() > expiresAt)
        } catch (error) {
            // console.log(error)
            return false
        }
    }

    async getNewAccessToken(ctx) {
        try {
            let requestConfig

            if (process.browser) {
                requestConfig = { withCredentials: true }
            } else {
                const { refreshToken } = cookies(ctx)

                if (!refreshToken) {
                    return false
                }

                requestConfig = {
                    headers: {
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                }
            }

            const newAccessTokenResponse = await axios.get(
                `/token/refreshToken`,
                requestConfig
            )
            const { accessToken } = newAccessTokenResponse.data

            this.setAccessToken(accessToken)
            // eslint-disable-next-line no-unneeded-ternary
            return accessToken ? true : false
        } catch (error) {
            return false
        }
    }

    // eslint-disable-next-line consistent-return
    async isAuthenticated(ctx) {
        const verifyAccessToken = await this.verifyAccessToken(this.accessToken)

        if (!verifyAccessToken) {
            const token = await this.getNewAccessToken(ctx)

            return Boolean(token)
        }

        return true
    }
}

export default new AuthHandler()
