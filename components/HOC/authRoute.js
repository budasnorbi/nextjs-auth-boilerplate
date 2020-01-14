import React from "react"
import Router from "next/router"

export default function(Component) {
    return class AuthRoute extends React.Component {
        static async getInitialProps(ctx) {
            let pageProps = {}

            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx)
            }

            return { ...pageProps }
        }

        componentDidMount() {
            const { isAuthenticated } = this.props
            if (!isAuthenticated) {
                Router.push("/login")
            }
        }

        render() {
            const { isAuthenticated } = this.props
            // eslint-disable-next-line react/jsx-props-no-spreading
            return isAuthenticated && <Component {...this.props} />
        }
    }
}
