import React from 'react'
import { auth, provider } from '../firebase-Config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuth }) {

    const navigate = useNavigate()
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/')
        })
    }
  return (
    <div className='login-page'>
        {/* <p>Sign with google</p> */}
        <button className='login-with-google-btn' onClick={signInWithGoogle}>
            Sign with Google Account
        </button>
    </div>
  )
}

export default Login;