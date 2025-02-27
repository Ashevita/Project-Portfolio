import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'


import user_icon from './assets/person.png'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'

const Signup = () => {
	return (
		<div className='Signcont'>
			<div className="header">
				<div className="text">Login</div>
				<div className="underline"></div>
		</div>
		<div className ="inputs">
			<div className="input">
			<img src={user_icon} alt="" />
			<input type="text" />
		</div>
		<div className="input">
			<img src={email_icon} alt="" />
			<input type="email" />
		</div>
		<div className="input">
		<img src={password_icon} alt="" />
		<input type="password" />
		</div>
		</div>
		<div className="forgot-password">
      <Link to="/forgot-password">Forgotten Password ?</Link>
			</div>
		<div className="submit-container">
			<div className="submit">Sign Up</div>
		</div>
	</div>
	);
};

export default Signup;
