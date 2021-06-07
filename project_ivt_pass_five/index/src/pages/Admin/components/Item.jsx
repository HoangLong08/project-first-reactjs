import '../style.css'
import { Col, Row, Form, Input, Button, Space } from 'antd'
import { useState } from 'react';
import { editProductAction } from '../../../redux/actions'
import { connect } from 'react-redux';

function ItemCart(props) {

  const { id, name, price, editProduct } = props;
  const [isEdit, setIsEdit] = useState(false)

  function handleEditProduct(values, index) {
    editProduct(values)
  }

  function renderEdit(){
    return (
      <Form layout='vertical'
            className='form-edit'
            initialValues={{id: id, name: name, price: price}}
            onFinish={(values) => {
              handleEditProduct(values)
              setIsEdit(false)
            }}  >
        <Form.Item label='ID' name='id'>
            <Input disabled/>
        </Form.Item>
        <Form.Item label='Name' name='name'>
            <Input/>
        </Form.Item>
        <Form.Item label='Price' name='price'>
            <Input/>
        </Form.Item>
        <Button type='primary' htmlType='submit'>Submit</Button>
        <Button danger onClick={() => setIsEdit(false)}>Cancel</Button>
      </Form>
    )
  }
  function renderItemView(){
    return (
      <Col span={12}>
      <div className="box-product">
        <Row style={{ width: '100%' }}>
          <Col span={6}>
            <div className="img-product">
              <img src="https://via.placeholder.com/70x70" />
            </div>
          </Col>
          <Col span={14}>
            <div className="des-product">
              <div>ID: {id}</div>
              <div>Name: {name}</div>
              <div>Prize: {price}</div>
            </div>
          </Col>
          <Col span={4}>
            <div className="btn-product">
              <Button onClick={() => setIsEdit(true)}>Edit</Button>
              <button>Remove</button>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
    )
   }
  return (
    <>
      { isEdit ? renderEdit() : renderItemView()}
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (params) => dispatch(editProductAction(params))
  }
}

export default connect(null,mapDispatchToProps)(ItemCart);