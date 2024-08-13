import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { useSelector } from 'react-redux';

function PersonalInfo() {
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/users/${userInfo._id}`);
        setUser(data);
      } catch (error) {}
    };
    fetchUserInfo();
  }, [userInfo]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <Container className="my-  d-flex justify-content-center align-items-center">
      <div className="my-3 ">
        <div className="mb-3" style={{ borderBottom: '1px solid grey' }}>
          <h5>Edit Menbership Profile</h5>
        </div>
        <Card>
          <Card.Body>
            <div className='d-flex gap-3 flex-column'>
              <div className="d-flex align-items-center gap-5 justify-content-between">
                <div className="d-flex text-capitalize gap-5 align-items-center">
                  <span className="fw-bold smallPBold">Name:</span>
                  <span>{userInfo?.name}</span>
                </div>

                <Link>Deactivate Account</Link>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">Gender:</p>
                <p>{userInfo?.gender}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5">
                <p className="fw-bold smallPBold">Email Address:</p>
                <p>{userInfo?.email}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">Contact Address:</p>
                <p>{userInfo?.address}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">Zip/Postal Code:</p>
                <p>{userInfo?.postalCode}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">Tel:</p>
                <p>{userInfo?.phoneNumber}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">Fax:</p>
                <p>{userInfo.fax}</p>
              </div>
              <div className="d-flex text-capitalize align-items-center gap-5 ">
                <p className="fw-bold smallPBold">country/Region:</p>
                <p>{userInfo?.country}</p>
              </div>
              <div className="text-center d-flex gap-3 align-items-center">
                <Button
                  style={{ backgroundColor: '', color: 'black', border:"grey 1px solid " }}
                  variant="lighter"
                  className="fw-bold "
                  onClick={() => navigate(`/user/profile/${userInfo._id}`)}

                >
                  Go to profile
                </Button>
                <Button
                  style={{ backgroundColor: 'orangered', color: 'white' }}
                  variant="lighter"
                  className="fw-bold "
                  onClick={() => navigate(`/edit/profile/${userInfo._id}`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default PersonalInfo;
