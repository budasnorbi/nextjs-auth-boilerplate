import React from "react"
import { Formik, ErrorMessage } from "formik"
import AuthHandler from "../lib/authHandler"
import authRoute from "../components/HOC/authRoute"

const ChangePassword = () => {
    const handleChangePassword = async (
        credentials,
        { setStatus, setErrors }
    ) => {
        const changePasswordRes = await AuthHandler.changePassword(credentials)
        // console.log(changePasswordRes)

        if (changePasswordRes.message) {
            setStatus({ message: changePasswordRes.message })
        } else {
            setErrors(changePasswordRes)
        }
    }
    return (
        <div>
            <h1>Jelszó megváltoztatása</h1>
            <Formik
                onSubmit={handleChangePassword}
                initialValues={{
                    currentPassword: "",
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
                            <ErrorMessage
                                name="currentPassword"
                                component="div"
                            />

                            <label htmlFor="currentPassword">
                                Jelenleg jelszó:
                                <input
                                    id="currentPassword"
                                    type="password"
                                    name="currentPassword"
                                    onChange={handleChange}
                                    value={values.currentPassword}
                                    required
                                />
                            </label>
                        </div>
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

export default authRoute(ChangePassword)
