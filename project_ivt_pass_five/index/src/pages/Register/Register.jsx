import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import history from '../../utils/history';
import './style.css';
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import validation from './validation';
import { registerAction } from '../../redux/actions';

function Register({registerTask}) {
	const [values, setValues] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({})

	const handleChange = e => {
		const {name, value} = e.target
		setValues({
			...values,
			[name]: value
		})
	}	
	
	const handleSubmit = e => {
		const{ userName, email, password, confirmPassword} = values;
		e.preventDefault();
		setErrors(validation(values))
	
		if(userName.length !== 0 && email.length !==0 && password.length!==0 && confirmPassword.length !== 0 && password === confirmPassword){
			registerTask(values)
		}
		
	}

	return (
		<>
			<Header/>
			<div className="wrap-register">
				<div className="content-register">
					<h1 className="sign-up-heading">Đăng ký</h1>
					<form className="sign-up-form" onSubmit={handleSubmit}>
						<div className="form-inputs">
							<label htmlFor="userName" className="sign-up-label">User name</label>
							<input
								id="userName"
								type="text"
								name="userName"
								className="sign-up-input"
								placeholder="Nhập tên đăng nhập của bạn"
								value ={values.userName}
								onChange={handleChange}
							/>
							{errors.userName && <p className="error">{errors.userName}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="email" className="sign-up-label">Email</label>
							<input
								id="email"
								type="email"
								name="email"
								className="sign-up-input"
								placeholder="Nhập email của bạn"
								value ={values.email}
								onChange={handleChange}
							/>
							{errors.email && <p className="error">{errors.email}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="password" className="sign-up-label">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								className="sign-up-input"
								placeholder="Nhập mật khẩu của bạn"
								value ={values.password}
								onChange={handleChange}
							/>
							{errors.password && <p className="error">{errors.password}</p>}
						</div>
						<div className="form-inputs">
							<label htmlFor="password" className="sign-up-label">Confirm Password</label>
							<input
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								className="sign-up-input"
								placeholder="Xác nhận mật khẩu của bạn"
								value ={values.confirmPassword}
								onChange={handleChange}
							/>
							{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
						</div>
						<div className="btn">
							<button className="sign-up-submit" type="submit">
								Đăng ký
							</button>
							<p>Bạn đã có tài khoản <Link to ="/dang-nhap">Đăng nhập</Link></p>
							
						</div>
						<div className="sign-up-or"><span></span></div>
						<button className="sign-up-social-google">
							<i className="fa fa-google sign-up-social-google-icon"></i>
							<span className="sign-up-social-google-text">Tiếp tục bằng Google</span>
						</button>
						<button className="sign-up-social-facebook">
							<i className="fa fa-facebook sign-up-social-facebook-icon"></i>
							<span className="sign-up-social-facebook-text">Tiếp tục bằng Facebook</span>
						</button>
					</form>
				</div>
			</div>
			<Footer/>
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerTask: (params) => dispatch(registerAction(params)),
	};
}
export default connect(null, mapDispatchToProps)(Register)

