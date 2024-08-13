import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddNewCard(props) {
  const { paySetOpen } = props;
const navigate= useNavigate()
const {userInfo}= useSelector((state)=>state.user)
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container
        className="my-5 p-3"
        style={{
          width:"100vw",
          
          backgroundColor: 'white',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <h3 className="text-center mb-4">Add New Card</h3>
        <div className="d-flex gap-3">
          <strong>Add New Card</strong>
          <div
            className="d-flex align-items-center pb-4 gap-3 flex-wrap"
            style={{ backgroundColor: '1px solid rgb(218, 217, 217)' }}
          >
            <div style={{ width: '50px' }}>
              <img
                style={{ width: '100%' }}
                src="/images/mastercard.jpg"
                alt=""
              />
            </div>
            <div style={{ width: '50px' }}>
              <img
                style={{ width: '100%' }}
                src="/images/applepay.jpg"
                alt=""
              />
            </div>
            <div className='d-none d-md-flex' style={{ width: '50px' }}>
              {' '}
              <img
                style={{ width: '100%' }}
                src="/images/gpay_real.jpg"
                alt=""
              />
            </div>
            <div className='d-none d-md-flex' style={{ width: '30px' }}>
              <img style={{ width: '100%' }} src="/images/paypal.png" alt="" />
            </div>
            <div className='d-none d-md-flex' style={{ width: '50px' }}>
              {' '}
              <img style={{ width: '100%' }} src="/images/stripe.jpg" alt="" />
            </div>
            <div className='d-none d-md-flex' style={{ width: '40px' }}>
              <img style={{ width: '100%' }} src="/images/visa.png" alt="" />
            </div>
            <div className='d-none d-md-flex' style={{ width: '50px' }}>
              <img
                style={{ width: '100%' }}
                src="/images/mastercard.jpg"
                alt=""
              />
            </div>
            <div className='d-none d-md-flex' style={{ width: '50px' }}>
              <img
                style={{ width: '100%' }}
                src="/images/applepay.jpg"
                alt=""
              />
            </div>
            <div className='d-none d-md-flex' style={{ width: '50px' }}>
              {' '}
              <img
                style={{ width: '100%' }}
                src="/images/gpay_real.jpg"
                alt=""
              />
            </div>
            <div className='d-none d-md-flex' style={{ width: '30px' }}>
              <img style={{ width: '100%' }} src="/images/paypal.png" alt="" />
            </div>
            <div style={{ width: '50px' }}>
              {' '}
              <img style={{ width: '100%' }} src="/images/stripe.jpg" alt="" />
            </div>
          </div>
        </div>

        <div
          className="pb-5"
          style={{ borderBottom: '2px solid rgb(218, 217, 217)' }}
        >
          <Form>
            <div style={{ width:"100%",  margin:"auto"}}  className="d-flex justify-content-center  gap-3 flex-wrap">
              <div style={{width:"45%"}}>
                <div className="my-5">
                  <FormGroup>
                    <Form.Control className="p-2" placeholder="Card Number" />
                  </FormGroup>
                </div>
                <div style={{ width: '100%' }} className="d-flex gap-3">
                  <div style={{width: '48%'  }}>
                    {' '}
                    <FormGroup>
                      <Form.Control className="p-2" placeholder="MM" />
                    </FormGroup>
                  </div>
                  <div style={{ width: '48%' }}>
                    <FormGroup>
                      <Form.Control className="p-2" placeholder="YY" />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="my-5" style={{width:"45%"}}>
                <div>
                <FormGroup className="mb-5">
                  <Form.Control className="p-2" placeholder="Name On Card" />
                </FormGroup>
                </div>
                <div style={{}}>
                <FormGroup>
                  <Form.Control className="p-2" placeholder="CVV" />
                </FormGroup>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="d-flex flex-wrap gap-3 p-3 justify-content-between">
          <span style={{ fontSize: '13px', opacity: '0.7' }}>
            After you add a card, a small amount (€1 or US $1, depending on the
            card issuing country) will make the pre-authorization to your card
            for verification purposes only. It will be refunded within 1-7
            business days.
          </span>
          <Button
            variant="lighter"
            style={{ backgroundColor: 'orangered ', borderRadius: '20px' }}
            className="fw-bold text-white px-5"
          >
            Save
          </Button>
        </div>
        <div
          onClick={() => paySetOpen(false)}
          style={{ position: 'absolute', top: 0, right: 30, opacity: '0.8', cursor:"pointer" }}
          className="fs-1"
        >
          x
        </div>
      </Container>
    </div>
  );
}

export default AddNewCard;
