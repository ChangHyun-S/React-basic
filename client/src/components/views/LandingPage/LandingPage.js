import React, { useEffect } from 'react'
import axios from 'axios'
import { response } from 'express';

function LandingPage() {
    useEffect(() => {
        axios.get("/api/hello").then((response) => {
          console.log(response);
        });
      }, []);
    
    const oncClickHandler = () => {
      axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data)
      })
    }

    return (
      <div style = {{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
      <button onClick={oncClickHandler}>
        로그아웃
      </button>
      </div>
    )
}

export default LandingPage
