import React from "react"
import Link from "next/link"

const Index = () => {
    return (
        <div>
            <h1>Főoldal</h1>
            <Link href="/login">
                <button type="button">Bejelentkezés</button>
            </Link>
            <Link href="/register">
                <button type="button">Regisztráció</button>
            </Link>
        </div>
    )
}

export default Index
