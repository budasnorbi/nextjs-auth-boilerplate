import React from "react"
import { Formik, ErrorMessage } from "formik"
import AuthHandler from "../lib/authHandler"

const ForgotPassword = () => {
    const handleForgotPassword = async (
        credentials,
        { setStatus, setErrors }
    ) => {
        const forgetPasswordRes = await AuthHandler.forgetPassword(credentials)

        if (forgetPasswordRes.message) {
            setStatus({ message: forgetPasswordRes.message })
        } else {
            setErrors(forgetPasswordRes)
        }
    }
    return (
        <div>
            <h1>Elfelejtett jelszó</h1>
            <Formik
                onSubmit={handleForgotPassword}
                initialValues={{
                    email: "",
                    name: "",
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
                            <ErrorMessage name="name" component="div" />

                            <label htmlFor="name">
                                Név:
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    autoComplete="name"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <ErrorMessage name="email" component="div" />

                            <label htmlFor="email">
                                E-mail cím:
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    autoComplete="email"
                                    required
                                />
                            </label>
                        </div>

                        <button disabled={isSubmitting} type="submit">
                            Jelszó igénylő e-mail
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPassword
