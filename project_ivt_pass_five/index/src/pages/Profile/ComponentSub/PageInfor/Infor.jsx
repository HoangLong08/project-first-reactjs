import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col , Input, Radio, DatePicker } from 'antd';

import {changeInforAction, getUserInfoAction} from '../../../../redux/actions'

import './style.css'

function Infor({userInfo, changeInforTask, getUserInfo}) {
	// console.log("userInfo: ",userInfo)
	var user = JSON.parse(localStorage.getItem('userInfo'));
	// console.log(user)

	const [errors, setErrors] = useState({
		email: '',
		fullname: '',
		nameAccount: '',
		phone: '',
		date: ''
	})

	function handleChangeDate(date, dateString) {
		console.log("dateString dateString: ", dateString)
		setValues({...values, date: dateString})
	}
	// console.log("dateValue dateValue: ", dateValue)

	const [values, setValues] = useState({
		id: user.id,
		email: user.email,
		fullname: '',
		gender: "Nam",
		nameAccount: user.userName,
		phone: '',
		date: moment().format('L')
	});

	const handleChange = (e) => {

		const { name, value } = e.target
		setValues({
			...values,
			[name]:  value
		})
	}

	function handleSubmit() {
		let isValid = true;
		const newChangeError = {
			errEmail: '',
			errNameAccount: '',
			errFullname: '',
			errNameAccount: '',
			errPhone: '',
			errDate: ''
		}

		if (values.email.length === 0) {
			isValid = false;
			newChangeError.errEmail = "Vui lòng nhập mật khẩu cũ !";
		} else if(!/.+@.+\.[A-Za-z]+$/.test(values.email)){
			isValid = false;
			newChangeError.errEmail = "Email không hợp lệ"
		}else {
			newChangeError.errEmail = "";
		}


		if (values.nameAccount.length === 0) {
			isValid = false;
			newChangeError.errNameAccount = "Vui lòng nhập tên tài khoản !";
		} else if(values.nameAccount.length > 6){
			isValid = false;
			newChangeError.errNameAccount = "Tên tài nhiều nhất là 6 ký tự";
		} else{
			newChangeError.errNameAccount = "";
		}


		if (values.fullname.length === 0) {
			isValid = false;
			newChangeError.errFullname = "Vui lòng nhập tên đầy đủ !";
		} else {
			newChangeError.errFullname = "";
		}

		if (values.phone.length === 0) {
			isValid = false;
			newChangeError.errPhone = "Vui lòng nhập số điện thoại !";
		} else if(!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)){
			isValid = false;
			newChangeError.errPhone = "Số điện thoại không hợp lệ"
		}else {
			newChangeError.errPhone = ""
		}

		// if (values.date.length === 0) {
		// 	isValid = false;
		// 	newChangeError.errDate = "Vui lòng chọn ngày sinh !";
		// } else {
		// 	newChangeError.errDate = ""
		// }

		if (isValid) {
			console.log("values input: ", values);
			changeInforTask(values)
		} else {
			setErrors({ ...newChangeError })
		}
	}

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col md={8} xs={24}>
					<div className="infor-user">
						<div className="infor-image">
							<img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg" alt="avatar" />
						</div>
						<div className="infor-name">
							<h3>{userInfo.data.userName}</h3>
						</div>
					</div>
				</Col>
				<Col md={16} xs={24}>
					<div className="infor-account">
						<div className="row-form">
							<label htmlFor="">
								Họ và tên
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập họ và tên"
									name="fullname"
									value={values.fullname}
									onChange={handleChange}
								/>
								{errors.errFullname && <p className="error">{errors.errFullname}</p>}

							</div>
							
						</div>
						<div className="row-form">
							<label htmlFor="">
								Email
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập email của bạn"
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
								{errors.errEmail && <p className="error">{errors.errEmail}</p>}

							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Tên đăng nhập
							</label>
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập tên đăng nhập của bạn"
									name="nameAccount"
									value={values.nameAccount}
									onChange={handleChange}
								/>
								{errors.errNameAccount && <p className="error">{errors.errNameAccount}</p>}
							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Giới tính
							</label>
							<div className="form-right">
								<Radio.Group onChange={handleChange} value={values.gender} name="gender">
									<Radio value={"Nam"} >Nam</Radio>
									<Radio value={"Nữ"}>Nữ</Radio>
									<Radio value={"Khác"}>Khác</Radio>
								</Radio.Group>
							</div>
							
						</div>
						<div className="row-form">
							<label htmlFor="">
								Ngày sinh
							</label>
							<div className="form-right">
								<DatePicker 
									onChange={handleChangeDate} 
									format="DD/MM/YYYY" 
								/>
							</div>
						</div>
						<div className="row-form">
							<label htmlFor="">
								Số điện thoại
							</label>
							
							<div className="form-right">
								<Input
									size="large"
									placeholder="Nhập số điện thoại"
									name="phone"
									value={values.phone}
									onChange={handleChange}
								/>
								{errors.errPhone && <p className="error">{errors.errPhone}</p>}
							</div>
						</div>
						<div className="button-submit">
							<button onClick={() => handleSubmit()}>
								Cập nhật
							</button>
						</div>
					</div>
				</Col>
			</Row>

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
		changeInforTask: (params) => dispatch(changeInforAction(params)),
		getUserInfo: (params) => dispatch(getUserInfoAction(params)),
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Infor)
