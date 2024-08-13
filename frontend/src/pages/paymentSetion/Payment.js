import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import LoadingBox from '../../utils/LoadingBox';
import Button from 'react-bootstrap/esm/Button';
import { paymentSuccess } from '../../redux/paymentSection/paymentSlice';
import { useDispatch } from 'react-redux';

function Payment(props) {
    const {setOpen} = props;
    const [loading, setLoading]=  useState(false)
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch()

  const handlePayment = ()=>{
    dispatch(paymentSuccess(paymentMethod))
    setOpen(false)
  }
 
  const handleInputChange = (e)=>{
    setPaymentMethod(e.target.value)
  }

  return (
    <div>

        
      <div style={{ backgroundColor:"white", borderRadius:"20px" }} className='p-5' >
        <div className='d-flex align-items-center flex-column justify-content-center'>
            <strong className=''>Payment Method</strong>
          <FormGroup className='mt-4'>
            <Form.Check
              type="checkbox"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup >
            <Form.Check
              type="checkbox"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={handleInputChange}
            />
          </FormGroup>
          <div className="d-flex gap-3 align-items-center my-5">
              <Button
                type="submit"
                variant="light"
                style={{ backgroundColor: 'orange' }}
                className="bott fw-bold px-5"
                onClick={handlePayment}
              >
                {loading ? (<LoadingBox />) : "Confirm"}
                
              </Button>
              <Button
                variant="light"
                className="px-5 fw-bold bott2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
