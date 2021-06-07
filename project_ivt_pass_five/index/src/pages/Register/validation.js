const validation = (values) => {
	let errors = {};

	if(!values.userName.trim() ){
		errors.userName = "Vui lòng nhập tên đăng nhập";
	}else if(values.userName.length > 6){
		errors.userName = "Tên đăng nhập không được quá 6 ký tự";
	}

	if(!values.email ){
		errors.email = "Vui lòng nhập email";
		
	}else if(!/.+@.+\.[A-Za-z]+$/.test(values.email)){
		errors.email = "Email không hợp lệ"
	}

	if(!values.password ){
		errors.password = "Vui lòng nhập mật khẩu";
	}
	if(!values.confirmPassword){
		errors.confirmPassword = "Vui lòng xác nhận lại mật khẩu";
	}else if(values.password !== values.confirmPassword){
		errors.confirmPassword = "Mật khẩu không trùng khớp";
	}
	return errors;
}
export default validation;