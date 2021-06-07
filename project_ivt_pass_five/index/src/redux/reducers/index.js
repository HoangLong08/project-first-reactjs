import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';

export default combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
})