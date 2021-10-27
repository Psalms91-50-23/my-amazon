import React from 'react'
import "../css/Login.css"
import { NavLink } from 'react-router-dom'

const Login = () => {

    return (
        <div className="login">
            <NavLink to="/">
                <img className="login__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
            </NavLink>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="" className="login__form__signup">
                    <h5>E-mail</h5>
                    <input type="text" />

                    <h5>Password</h5>
                    <input type="password" /> 

                    <button className="login__signInButton">Sign in</button>
                </form>
                <p>
                     By continuing, you agree to Amazon's Conditions of Use and Privacy Notice. 
                </p>
                <button className="login__registerButton">Create Your Account</button>
            </div>
          
        </div>
    )
}

export default Login
