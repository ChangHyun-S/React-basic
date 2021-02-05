import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch()
    // state
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // preventDefault 안쓰면 클릭마다 페이지가 리프레쉬됨
        event.preventDefault()

        // 비밀번호 체크
        if(Password !== ConfirmPassword) {
            return alert('비밀번호가 다릅니다')
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        }

        // redux 사용해서 
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
                }
            })
    }
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br />
                <button type="submit">
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
