import React, { useState } from 'react'
import "../css/Login.css"
import { NavLink, useHistory } from 'react-router-dom'
import { auth } from "../firebase"
// import { setDisplayName } from "../actions/basketAction"
// import { useDispatch, useSelector } from 'react-redux'


const Login = () => {

    // const { user, basket } = useSelector(state => state.cart)
    // const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [profileName, setProfileName] = useState("")

    const signIn = e => {

        e.preventDefault()

        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth => {

            if(auth)
            {
               
                // dispatch(setDisplayName(profileName))
                history.push("/")
            }
            
        })
        .catch(error => {
            alert(error.message)
        })

    }

    const register = e => {
        e.preventDefault()

        auth
        .createUserWithEmailAndPassword(email,password)
        .then(auth => {
            // console.log("auth" ,auth)
            if(auth)
            {
                // dispatch(setDisplayName(profileName))
                // console.log("history ",history)
                history.push("/")
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <NavLink to="/">
                <img className="login__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
            </NavLink>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="" className="login__form__signup">
{/*                     
                    <h5>Display Name</h5>
                    <input type="text" onChange={e => setProfileName(e.target.value)} value={profileName} />  */}

                    <h5>E-mail</h5>
                    <input type="text" onChange={e => setEmail(e.target.value)} value={email}/>

                    <h5>Password</h5>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password}/> 

                    <button className="login__signInButton" onClick={e => signIn(e)}>Sign in</button>
                </form>
                <p>
                     By continuing, you agree to Amazon's Conditions of Use and Privacy Notice. 
                </p>
                <button className="login__registerButton" onClick={(e) => register(e)}>Create Your Account</button>
            </div>
          
        </div>
    )
}

export default Login
