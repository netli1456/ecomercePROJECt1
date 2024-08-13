import React, { useEffect } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RefundAndReturn() {
  const navigate= useNavigate()
const {userInfo}= useSelector((state)=>state.user)
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <h5 className="mb-3">Refunds/Return</h5>
      <div className="mb-3 colBG px-4 py-5">
        <div className=" d-flex gap-3 align-items-center mb-3">
          <span style={{ color: 'red' }}>In progress(0)</span>
          <span>Awaiting returns(0)</span>
        </div>
        <div>
          <Form>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <FormGroup>
                <Form.Control className='p-2' placeholder="Order number" />
              </FormGroup>
              <FormGroup>
                <Form.Control className='p-2' placeholder="Store name" />
              </FormGroup>
              <FormGroup>
                <Form.Control className='p-2' placeholder="All" />
              </FormGroup>
              <Button
                className="px-4 fw-bold"
                variant="lighter"
                style={{
                  backgroundColor: 'orangered',
                  borderRadius: '20px',
                  color: 'white',
                }}
              >
                Search
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div>
        <div className='colBG mb-1 p-3 d-flex flex-wrap align-items-center'>
        <span style={{width:"48%", opacity:"0.6"}}>Order information</span>
        <span style={{width:"48%", opacity:"0.6"}}>Current status</span>
        </div>
        <div className='colBG p-3'>
        <span>Refund_returns_list_not_order</span>
    
        </div>
      </div>
    </div>
  );
}

export default RefundAndReturn;
