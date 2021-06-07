import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { notification } from 'antd';

import {URL} from '../../contrains/App'

const openNotificationWithIcon = type => {
  notification[type]({
    message: '',
    description: type === 'error' ? 'Thay đổi mật khẩu không thành công' : 'Thay đổi mật khẩu thành công',
    duration: 2
  });
};
function* loginSaga(action) {
 
  try {
    const { email, password, prevPath } = action.payload;
    
    const result = yield axios({
      method: 'GET',
      url: URL + '/users',
      params: {
        email,
        password,
      }
    });
    if (result.data.length > 0) {
    
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      
      if(result.data[0].admin) {
        yield put({ // đợi rồi mới chạy
          type: "LOGIN_SUCCESS",
          payload: {
            data: result.data[0],
          },
        });
        yield history.push('/admin');
      } else {
        yield put({ // đợi rồi mới chạy
          type: "LOGIN_SUCCESS",
          payload: {
            data: result.data[0],
          },
        });
        console.log("prevPath: ", prevPath)
        yield history.push(prevPath ? prevPath : "/");
      }
    } else {
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Email hoặc mật khẩu không đúng',
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(URL + `/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, userName } = action.payload;
    
    // const result = yield axios({
    //   method: 'POST',
    //   url: URL + '/users',
    // }, {email, password, userName})  // không hiểu tại sao luôn
    const user = yield axios.get(URL + '/users'	)
		const u = user.data.find(user => user.email === email)
    if(u){
      yield alert("Email đã tồn tại")
    }else{
      const result = yield axios.post(URL + '/users'
      , {email, password, userName, admin: false} )
      
      if (result.data) {
        yield put({ // đợi rồi mới chạy
          type: "REGISTER_SUCCESS",
          payload: {
            // data: result.data[0],
            data: result.data,
          },
        });
        yield alert("Đăng ký thành công");
      } else {
        yield put({
          type: "REGISTER_FAIL",
          payload: {
            error: 'Email đã được đăng ký',
          },
        });
      }
    }
  } catch (e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductOrderListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: URL + '/orders?userId='+action.payload
    });
    yield put({
      type: "GET_PRODUCT_ORDER_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_ORDER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* changePasswordSaga(action){
  const {id,  email, passwordOld, passwordNew } = action.payload;
  const result = yield axios({
    method: 'GET',
    url: URL + '/users',
    params:{
      email,
      password: passwordOld,
    }
  });
  if(result.data.length > 0 ){
    // const resultTwo = yield axios({
    //   method: 'PATCH',
    //   url: URL + '/users/'+id,
    //   data:{
    //     password: passwordNew,
    //   }
    // });
    yield axios.patch(URL + `/users/${id}`,{password: passwordNew})
    yield openNotificationWithIcon('success')
    
    // yield put({
    //   type: "CHANGE_PASSWORD_SUCCESS",
    //   payload: {
    //     data: result.data
    //   },
    // });
    
  }else{
    openNotificationWithIcon('error')
  }
 
}

export default function* userSaga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
  yield takeEvery('REGISTER_REQUEST', registerSaga);
  yield takeEvery('GET_PRODUCT_ORDER_LIST_REQUEST', getProductOrderListSaga);
  yield takeEvery('CHANGE_PASSWORD_REQUEST', changePasswordSaga);
}
