import './App.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import SwitchRoute from './SwitchRoute'
import { getUserInfoAction } from './redux/actions';

function App({getUserInfo }) {
  
  useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo && userInfo.id) {
		  getUserInfo({ id: userInfo.id });
		}
	 }, []);
  return (
    <> 
      <SwitchRoute />
      
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  };
}
export default connect(null, mapDispatchToProps)(App);
