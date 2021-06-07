import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import Header from '../commom/Header';
import Footer from '../commom/Footer';
import Item from '../commom/Item';

import './style.css'

import { getProductSearchAction } from '../../redux/actions';

function Index({ productListSearch, searchAction }) {
	const { search } = useLocation();
	console.log("search: ", search)
	const parsed = queryString.parse(window.location.search);

	const [productListSearchs, setProductListSearchs] = useState(productListSearch.data)

	useEffect(() => {
		setProductListSearchs(productListSearch.data)
	}, [productListSearch.data])

	useEffect(() => {
		searchAction({ search: parsed.q })
	}, [parsed.q])

	function sortASC() {
		const dataToSort = [...productListSearchs];
		return dataToSort.sort(function(a, b) {
			return (a.price) - (b.price);
	  	});
	}

	function sortDESC() {
		const dataToSort = [...productListSearchs];
		return dataToSort.sort(function(a, b) {
			return  (b.price) - (a.price) ;
	  	});
	}

	function renderProductList() {
		console.log("productListSearchs22:  ", productListSearchs)
		const dataToSort = [...productListSearchs];
		if(dataToSort.length > 0){
			return dataToSort.map((item, id) => {
				var sum = 0;
				item.comments.map((itemComment) =>{
					sum += itemComment.inforComment.countStar;
				})
				if(sum > 0){
					sum/= item.comments.length
				}else{
					sum = 5
				}
				return (
					<Col md={6} xs={12} key={id}>
						<Item id={item.id} name={item.name} price={item.price} image={item.image} comments={item.comments} avgStar={Math.round(sum / 0.5) * 0.5}/>
					</Col>
				)
			})
		}else{
			return (
				<h1>Không có data</h1>
			)
		}
		
	}

	return (
		<>
			<Header />
			<div className="wrap-search">
				<Row gutter={[16, 16]}>
					<Col md={5} xs={24}>
						<div className="fillter">
							<h3>Sắp xếp theo</h3>
							<ul>
								<li onClick={()=> {setProductListSearchs(sortASC())} }>Sắp xếp giá tăng dần</li>
								<li onClick={()=> {setProductListSearchs(sortDESC())} }>Sắp xếp giá giảm dần</li>
								<li></li>
							</ul>
						</div>
					</Col>

					{productListSearch.load ? (
						<Col md={19} xs={24}>
							<div> <h1>Loading</h1> </div>
						</Col>
					) : (
						<Col md={19} xs={24}>
							<div className="search-product">
							<Row gutter={[16, 16]}>
								{renderProductList()}
							</Row>
							</div>
						</Col>
					)}

				</Row>
			</div>
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => {
	const { productListSearch } = state.productReducer;
	return {
		productListSearch
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchAction: (params) => dispatch(getProductSearchAction(params)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
