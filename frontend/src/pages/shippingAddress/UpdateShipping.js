import React, {useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import { apiUrl } from '../../utils/ApiConfig';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  shippingFail,
  shippingStart,
  shippingSuccess,
} from '../../redux/shippingSection/shippinSlice';
import LoadingBox from '../../utils/LoadingBox';
import { toast } from 'react-toastify';

function UpdateShipping(props) {
  const { setOpen, shipSetOpen, shipOpen, userShippingAddress } = props;
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.shippingAddress);
  const { userInfo } = useSelector((state) => state.user);

  const [streetAddress, setStreetAddress] = useState(
    shipping.streetAddress || ''
  );
  const [name, setName] = useState(
    userShippingAddress ? userShippingAddress?.name : shipping.name || ''
  );
  const [phoneNumber, setNumber] = useState(
    userShippingAddress?.phoneNumber || shipping.phoneNumber || ''
  );
  const [appartment, setApartment] = useState(shipping.appartment || '');
  const [zipCode, setZipCode] = useState(shipping.zipCode || '');
  const [state, setState] = useState(shipping.state || '');
  const [country, setCountry] = useState(shipping.country || '');
  const [localGov, setLocalGov] = useState(shipping.localGov || '');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleShipping = async (e) => {
    e.preventDefault();
    dispatch(shippingStart());
    setLoading(true);
    const shippingData = {
      name: name,
      phoneNumber: phoneNumber,
      appartment: appartment,
      streetAddress: streetAddress,
      zipCode: zipCode,
      state: state,
      country: country,
      localGov: localGov,
      userId: userInfo?._id,
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/api/shipping/${shipping?._id}`,
        shippingData
      );

      setLoading(false);
      if (shipOpen) {
        shipSetOpen(false);
        dispatch(shippingSuccess(data));
      } else {
        setOpen(false);

        dispatch(shippingSuccess(data));
      }
    } catch (error) {
      toast.error('error',{toastId: "unique-toast-id", autoClose:500}, );

      shippingFail();
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setApartment(inputValue);

    if (inputValue.length < 5) {
      return setError(true);
    } else {
      setError(false);
    }
  };

  const handleName = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

 

 
  return (
    <div className="cartOpacity2 " style={{ borderRadius: '20px',  border:"1px solid red",  }}>
      <div
        className="d-flex align-items-center justify-content-center gap-3"
        style={{
          height: '',
          opacity: '1',
          width: '',
          margin: 'auto',
          borderRadius: '10px',
        }}
      >
        <Form
          onSubmit={handleShipping}
          style={{ width: '100%' }}
          className="p-4"
        >
          <div className="text-center mb-3">
            <strong>Add New Address</strong>
          </div>
          <FormGroup style={{ width: '50%' }} className="mb-3">
            <Form.Label>
              <strong>Country/Region</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setCountry(e.target.value)}
              as="select"
              value={country}
              required
            >
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Usa">Usa</option>
              <option value="Uk">Uk</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="Switzerland">switzerland</option>
              <option value="Netherland">Netherland</option>
            </Form.Control>
          </FormGroup>
          <div className="mb-2">
            {' '}
            <strong>Personal Information</strong>
          </div>
          <div className="d-md-flex align-items-center gap-3 mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                value={name}
                placeholder="contact name"
                required
                onChange={handleName}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>234</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Mobile number*"
                aria-label="Mobile number"
                value={phoneNumber}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </InputGroup>
          </div>
          <div className="">
            <strong>Address</strong>
            <div className="d-md-flex align-items-center gap-3 mb-3">
              <FormGroup style={{ width: '300px' }} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="street, house/apartment unit*"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup style={{ width: '300px' }} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Apt,Suit,Unit etc. (optional)"
                  value={appartment}
                  onChange={handleInputChange}
                  isInvalid={error}
                />
                <Form.Control.Feedback type="invalid">
                  Apartment must be at least 5 characters long.
                </Form.Control.Feedback>
              </FormGroup>
            </div>
            <div className="d-md-flex align-items-center gap-3 mb-3">
              <FormGroup style={{ width: '200px' }} className="mb-3">
                <Form.Control
                  as="select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="lagos">Lagos</option>
                  <option value="edo">Edo</option>
                  <option value="abia">Abia</option>
                  <option value="kaduna">Kaduna</option>
                  <option value="delta">Delta</option>
                  <option value="abuja">Abuja</option>
                  <option value="anambra">Anambra</option>
                  <option value="crossriver">Cross River</option>
                  <option value="bauchi">Bauchi</option>
                </Form.Control>
              </FormGroup>
              <FormGroup style={{ width: '200px' }} className="mb-3">
                <Form.Control
                  as="select"
                  value={localGov}
                  onChange={(e) => setLocalGov(e.target.value)}
                >
                  <option value="north">Lagos North</option>
                  <option value="south">Lagos South</option>
                  <option value="east">Lagos east</option>
                  <option value="west">Lagos west</option>
                </Form.Control>
              </FormGroup>
              <FormGroup style={{ width: '200px' }} className="mb-3">
                <Form.Control
                  type="number"
                  value={zipCode}
                  placeholder="Zip code*"
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
            {shipOpen ? (
              <div className="d-flex gap-3 align-items-center">
                <Button
                  type="submit"
                  variant="light"
                  style={{ backgroundColor: 'orange' }}
                  className="bott fw-bold px-5"
                >
                  {loading ? <LoadingBox /> : 'Confirm'}
                </Button>

                <Button
                  variant="light"
                  className="px-5 fw-bold bott2"
                  onClick={() => shipSetOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-3 align-items-center">
                <Button
                  type="submit"
                  variant="light"
                  style={{ backgroundColor: 'orange' }}
                  className="bott fw-bold px-5"
                >
                  {loading ? <LoadingBox /> : 'Confirm'}
                </Button>

                <Button
                  variant="light"
                  className="px-5 fw-bold bott2"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UpdateShipping;
