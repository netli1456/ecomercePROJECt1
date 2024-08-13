import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { loginSuccess } from '../../../redux/userSection/userSlice';
import FormGroup from 'react-bootstrap/FormGroup';

function EditProfileInfo() {
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  const [name, setName] = useState(userInfo.name || '');
  const [address, setAddress] = useState(userInfo.address || '');
  const [fax, setFax] = useState(userInfo.fax || '');
  const [gender, setGender] = useState(userInfo.gender || '');
  const [phoneNumber, SetphoneNumber] = useState(userInfo.phoneNumber || '');
  const [country, setCountry] = useState(userInfo.country || '');
  const [email, setEmail] = useState(userInfo.email || '');
  const [zip, setZip] = useState(userInfo.zip || '');

  const dispatch = useDispatch();

  const updateUserInfo = async (e) => {
    e.preventDefault();
    if (userInfo._id) {
      try {
        const formData = {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          fax: fax,
          address: address,
          zip: zip,
          gender: gender,
          country: country,
        };

        const { data } = await axios.put(
          `${apiUrl}/api/users/update/${userInfo._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setUser(data);
        dispatch(loginSuccess(data));
        console.log('userData', data);
        navigate('/user/personalinfo');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('no user info');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <Container className="  d-flex justify-content-center align-items-center">
      <Form className="my-3 " onSubmit={updateUserInfo} style={{ width: '' }}>
        <div className="mb-3" style={{ borderBottom: '1px solid grey' }}>
          <h5>Edit Menbership Profile</h5>
        </div>
        <Card>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-5 justify-content-between">
                <InputGroup>
                  <InputGroup.Text className="fw-bold smallPBold">
                    Name:
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="@name"
                  />
                </InputGroup>
              </div>

              <FormGroup>
                <Form.Label className="fw-bold smallPBold">Gender:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Control>
              </FormGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Email Address:
                </InputGroup.Text>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Contact Address:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Zip/Postal Code:
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Tel:
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => SetphoneNumber(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Fax:
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="fw-bold smallPBold">
                  Country/Region:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </InputGroup>
              <div className="text-center d-flex gap-5">
                <Button
                  style={{ backgroundColor: 'black', color: 'white' }}
                  variant="lighter"
                  className="fw-bold px-3"
                  onClick={() => navigate(`/user/personalinfo`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: 'red', color: 'white' }}
                  variant="lighter"
                  className="fw-bold px-4"
                >
                  Save
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}

export default EditProfileInfo;
