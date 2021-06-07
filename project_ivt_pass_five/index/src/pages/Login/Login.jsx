import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import './style.css'
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import validation from './validation';

import { loginAction } from '../../redux/actions';


function Login({loginTask, userInfo, location}) {
	
	const [values, setValues] = useState({
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({})

	if(Object.keys(userInfo.data).length !==0){
		return  <Redirect to="/" />;
	}

	const handleChange = e => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}
	console.log("location: ", location)
	const handleSubmit = e => {
		e.preventDefault();
		setErrors(validation(values))
		
		if(values.email.length !== 0 && values.password.length){	
			const newVal = location.state?.prevPath?{...values, prevPath: location.state.prevPath} : values
			loginTask(newVal)
		}
	}

	return (
		<>
			<Header />
			<div className="wrap-login">
				<div className="content-login">
					<h1 className="sign-in-heading">Đăng nhập</h1>

					<form className="sign-in-form" onSubmit={handleSubmit}>
						<div className="form-inputs">
							<label htmlFor="email" className="sign-in-label">Email</label>
							<input
								id="email"
								type="email"
								name="email"
								className="sign-in-input"
								placeholder="Nhập email của bạn"
								value={values.email}
								onChange={handleChange}
							/>
							{errors.email && <p className="error">{errors.email}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="password" className="sign-in-label">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								className="sign-in-input"
								placeholder="Nhập mật khẩu của bạn"
								onChange={handleChange}
							/>
							{errors.password && <p className="error">{errors.password}</p>}
						</div>
						<div className="btn-form-sign-in">
							<p className="error" style={{textAlign:"center"}}>{userInfo.error}</p>
							<button className="sign-in-submit" type="submit">
								Đăng nhập
							</button>
							<div style={{display: "flex", justifyContent: "space-between"}}>
								<p>Bạn chưa có tài khoản <Link to="/dang-ky">Đăng ký</Link></p>
								<p>Quên mật khẩu</p>
							</div>

						</div>
						<div className="sign-in-or"><span></span></div>
						<button className="sign-in-social-google">
							<i className="fa fa-google sign-in-social-google-icon"></i>
							<span className="sign-in-social-google-text">Đăng nhập bằng Google</span>
						</button>
						<button className="sign-in-social-facebook">
							<i className="fa fa-facebook sign-in-social-facebook-icon"></i>
							<span className="sign-in-social-facebook-text">Đăng nhập bằng Facebook</span>
						</button>
					</form>
				</div>

			</div>
			<Footer />
		</>
	)
}
const mapStateToProps = (state) => {
	const { userInfo } = state.userReducer;
	return {
		userInfo,
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		loginTask: (params) => dispatch(loginAction(params))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
