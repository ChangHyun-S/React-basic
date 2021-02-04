import React, { useState } from 'react'

function LoginPage() {
    // state
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit = {onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
