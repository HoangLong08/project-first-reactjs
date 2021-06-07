import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {URL} from '../../contrains/App'

function* paymentSaga(action) {
	const {userId, consigneeInfor, cart, payment, currentTime, totalOrder} = action.payload;
	console.log("consigneeInfor: ", consigneeInfor)
	const result = yield axios({
		method: 'POST',
		url: URL + '/orders',
		data: {
			userId,
			consigneeInfor,
			cart,
			payment,
			currentTime,
			totalOrder
		}
	});
	yield put({
      type: "PAYMENT_SUCCESS",
      payload: {
        data: result.data
      },
    });
	
}
export default function* productSaga() {
	yield takeEvery('PAYMENT_REQUEST', paymentSaga);
}
