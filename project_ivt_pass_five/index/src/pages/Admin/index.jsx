import { connect } from 'react-redux';
import Header from '../commom/Header';
import './style.css';
import ItemCart from './components/Item';
import { Button, Col, Row, Form, Input, Card } from 'antd';
import { addProductAction, getProductListAction } from '../../redux/actions';
import { useEffect, useState } from 'react';

function AdminPage({ productList, addProduct, getProduct}){

  useEffect(() => {
    getProduct()
  },[])

  
  
  const [ isShowAdd, setIsShowAdd ] = useState(false);
  // const { name, price } = productList.data[0]
  
  function renderProduct() {
    return productList.data.map((item,index) => {
      return <ItemCart 
      id={item.id} name={item.name} price={item.price} 
      
      />
    })
  }
  function handleAddProduct(values) {
    addProduct(values)
  }
 
  
  function renderAddProduct() {
    return (
      <div className="form-add">
        <Card 
          title="Add Product"
          size="small">
          <Form
            layout="vertical"
            name="addProduct"
            style={{width: '500px'}}
            initialValues={{ name: '', price: '' }}
            onFinish={(values) => {
              handleAddProduct(values)
              setIsShowAdd(false)
              window.location.reload()
              }
            }
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input name product!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input price product!' }]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </Card>    
      </div>
        
    )
  }
  return (
    <>
      <Header/>
      <div className="admin-container">
        <div className='add-product'>
          <Button onClick={() => setIsShowAdd(!isShowAdd)}>Add Product</Button>
        </div>
          {isShowAdd ? renderAddProduct() : null}
        <Row gutter={12}>
          {renderProduct()}
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  return {
    productList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (params) => dispatch(addProductAction(params)),
    getProduct: (params) => dispatch(getProductListAction(params)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (AdminPage);