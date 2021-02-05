import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

/*
SpecificComponent는  App.js에서 컴포넌트

option은
null 아무나 출입가능 
true 로그인한 유저만 출입 가능
false 로그인한 유저는 출입 불가능

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
            })
        }, [])
        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}