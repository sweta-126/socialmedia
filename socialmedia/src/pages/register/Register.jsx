import React, { useRef } from 'react';
import "./Register.css";
import {axiosInst} from "../../config";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const username= useRef();
    const email= useRef();
    const password= useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        } else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            };
            try{
                await axiosInst.post("/auth/register",user);
                navigate('/login');
            }catch(err){
                console.log(err);
            }
        }
    }

    const handleLogin = () =>{
        navigate('/login');
    }
  return (
    <div className='register'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">SocialMedia</h3>
                <span className="registerDesc">
                    Connect with friends and the world around you.
                </span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick} >
                    <input placeholder='Username' required ref={username} className="registerInput" />
                    <input placeholder='Email' required ref={email} type='email' className="registerInput" />
                    <input placeholder='Password' required ref={password} type='password' minLength="6" className="registerInput" />
                    <input placeholder='Password Again' required ref={passwordAgain} type='password' className="registerInput" />
                    <button className='registerButton' type='submit'>Sign Up</button>
                    <button className="registerButton" onClick={handleLogin}>Log into your Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
