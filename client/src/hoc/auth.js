import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

/*
SpecificComponent는  App.js에서 컴포넌트

option은
null 아무나 출입가능 
true 로그인한 유저만 출입 가능한 페이지
false 로그인한 유저는 출입 불가능한 페이지

adminRoute 에서 아무것도 안쓰면 null (es6 문법)
*/
export default function (SpecificComponent, option, adminRoute = null) {
    // HOC -> Request -> BackEnd
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth())
                .then(response => {
                    console.log(response)
                    // 로그인하지 않은 상태
                    if (!response.payload.isAuth) {
                        // 옵션이 true(로그인유저)인 페이지 들어갈려고 하면 거부
                        if (option) {
                            props.history.push('/login')
                        }
                    }
                    // 로그인한 상태
                    else {
                        // 어드민만 들어갈 수 있는 어드민이 아닌 유저가 들어갈 경우
                        if (adminRoute && !response.payload.isAdmin) {
                            props.history.push('/')
                        }
                        else {
                            if (option === false) {
                                props.history.push('/')
                            }
                        }

                    }
                })
        }, [])
        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}