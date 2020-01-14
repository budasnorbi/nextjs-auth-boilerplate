import React from "react"
import axios from "axios"
import { Formik, ErrorMessage } from "formik"

const Register = () => {
    const handleRegister = async (values, { setErrors, setStatus }) => {
        try {
            const res = await axios.post(
                `http://${process.env.HOST}:${process.env.BACKEND_PORT}/api/users/register`,
                values
            )

            setStatus({
                success: res.data.message,
            })
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    return (
        <div>
            <h1>Regisztráció</h1>
            <Formik
                onSubmit={handleRegister}
                initialValues={{
                    name: "",
                    email: "",
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
                        {status && status.success && (
                            <div>{status.success}</div>
                        )}
                        <div className="form-group">
                            <ErrorMessage name="name" component="div" />
                            <label htmlFor="name">
                                Név
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    required
                                />
                            </label>
                        </div>
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
                                Jelszó újra
                                <input
                                    id="passwordConfirm"
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={handleChange}
                                    value={values.passwordConfirm}
                                    autoComplete="new-password"
                                    required
                                />
                            </label>
                        </div>
                        <button disabled={isSubmitting} type="submit">
                            Regisztráció
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Register
