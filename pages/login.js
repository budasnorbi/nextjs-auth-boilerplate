import React from "react"
import Link from "next/link"
import { Formik, ErrorMessage } from "formik"
import Router from "next/router"
import AuthHandler from "../lib/authHandler"
import publicRoute from "../components/HOC/publicRoute"

const Login = () => {
    const handleLogin = async (credentials, { setErrors, setStatus }) => {
        const loginResponse = await AuthHandler.login(credentials)
        // console.log(loginResponse)
        if (loginResponse.message) {
            setStatus({ message: loginResponse.message })

            if (loginResponse.status === "success") {
                Router.push("/dashboard")
            }
        } else {
            setErrors(loginResponse)
        }
    }

    return (
        <div>
            <h1>Bejelentkezés</h1>
            <Formik
                onSubmit={handleLogin}
                initialValues={{
                    email: "",
                    password: "",
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    values,
                    status,
                }) => (
                    <form onSubmit={handleSubmit} method="post">
                        {status && status.message && (
                            <div>{status.message}</div>
                        )}
                        <div className="form-group">
                            <ErrorMessage name="email" component="div" />

                            <label htmlFor="email">
                                E-mail cím
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    autoComplete="username"
                                    required
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="password" component="div" />

                            <label htmlFor="password">
                                Jelszó
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    autoComplete="new-password"
                                    required
                                />
                            </label>
                        </div>

                        <button disabled={isSubmitting} type="submit">
                            Bejelentkezés
                        </button>
                    </form>
                )}
            </Formik>
            <Link href="/forget-password">
                <button type="button">Elfelejtett jelszó</button>
            </Link>
        </div>
    )
}

export default publicRoute(Login)
