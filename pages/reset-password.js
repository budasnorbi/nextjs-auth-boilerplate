import React from "react"
import Router from "next/router"
import { Formik, ErrorMessage } from "formik"
import AuthHandler from "../lib/authHandler"

const ResetPassword = () => {
    const handleResetPassword = async (
        credentials,
        { setStatus, setErrors }
    ) => {
        const { token } = Router.router.query
        const forgetPasswordRes = await AuthHandler.resetPassword(
            credentials,
            token
        )

        if (forgetPasswordRes.message) {
            setStatus({ message: forgetPasswordRes.message })

            if (forgetPasswordRes.status === "success") {
                Router.replace("/login")
            }
        } else {
            setErrors(forgetPasswordRes)
        }
    }
    return (
        <div>
            <h1>Jelszó megváltoztatása</h1>
            <Formik
                onSubmit={handleResetPassword}
                initialValues={{
                    password: "",
                    passwordConfirm: "",
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
                            <ErrorMessage name="password" component="div" />

                            <label htmlFor="password">
                                Jelszó:
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    autoComplete="password"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <ErrorMessage
                                name="passwordConfirm"
                                component="div"
                            />

                            <label htmlFor="passwordConfirm">
                                Jelszó újra:
                                <input
                                    id="passwordConfirm"
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={handleChange}
                                    value={values.passwordConfirm}
                                    autoComplete="password"
                                    required
                                />
                            </label>
                        </div>

                        <button disabled={isSubmitting} type="submit">
                            Jelszó megváltoztatása
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default ResetPassword
