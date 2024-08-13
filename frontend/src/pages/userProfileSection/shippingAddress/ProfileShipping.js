import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../utils/ApiConfig';
import { shippingSuccess } from '../../../redux/shippingSection/shippinSlice';
import LoadingBox from '../../../utils/LoadingBox';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { toast } from 'react-toastify';

function ProfileShipping(props) {
  const { shipping } = useSelector((state) => state.shippingAddress);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [shippingProf, setShippingProf] = useState({});

  const { shipOpen, shipSetOpen } = props;

  useEffect(() => {
    const fetchShipping = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/shipping/${userInfo?._id}`
        );
        if (Object.keys(shipping).length === 0) {
          dispatch(shippingSuccess(data));
        }
        setShippingProf(data);
        setLoading(false);
        if (shipSetOpen === false) {
          fetchShipping();
        }
      } catch (error) {
        toast.error('Error', { toastId: 'unique-toast-id', autoClose: 500 });
        setLoading(false);
      }
    };
    fetchShipping();
  }, [userInfo?._id, shipping, dispatch, shipSetOpen]);

  useEffect(() => {
    if (shipOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0,0)
    } else {
      document.body.style.overflow = 'scroll';
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div className={shipOpen ? 'p-3 shipinOpac' : 'p-3 shippinOpenHeight'}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div>
          {shippingProf ? (
            <div>
              <h6>My Shipping Address</h6>
              <div className="my-3">
                <Button className="fw-bold" variant="danger">
                  Add a new address
                </Button>
              </div>
              <div
                style={{
                  border: '1px solid red',
                  borderRadius: '10px',
                }}
                className="p-3"
              >
                <div className="text-end">
                  <span style={{ color: 'orange' }}>default address</span>
                </div>

                <div>
                  {shipping && (
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center text-capitalize gap-2">
                        <strong style={{ fontSize: '13px' }}>
                          {shipping?.name} +234
                          {shipping?.phoneNumber}
                        </strong>
                        <span></span>
                      </div>
                      <div
                        style={{ opacity: '0.9' }}
                        className="d-flex align-items-center gap-2 text-capitalize"
                      >
                        {' '}
                        <span>
                          {shipping?.streetAddress} {shipping?.state}{' '}
                          {shipping?.appartment}
                          {shipping?.localGov},
                          {shipping?.state === 'abuja'
                            ? `${shipping?.state},`
                            : `${shipping?.state} state,`}{' '}
                          {shipping?.country},{shipping?.zipCode}
                        </span>
                        <span></span>
                      </div>
                      <div
                        style={{ opacity: '0.9' }}
                        className="d-flex align-items-center gap-2 text-capitalize"
                      >
                        <span></span>
                      </div>
                      <div className="d-flex gap-3 mt-3">
                        <Link
                          onClick={() => shipSetOpen(true)}
                          className="text-decoration-none d-flex align-items-center gap-1"
                        >
                          Edit
                        </Link>
                        <Link className=" text-decoration-none d-flex align-items-center gap-1">
                          Delete
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className="colBG d-flex align-items-center justify-content-between p-3 mb-3">
                  <strong>Shipping Address</strong>
                </div>
                <div className="colBG p-3">
                  <div
                    onClick={() => shipSetOpen(true)}
                    className="profileBG d-flex align-items-center justify-content-center"
                    style={{ width: '50%', height: '150px', cursor: 'pointer' }}
                  >
                    <strong>
                      <AddCircleOutlineOutlinedIcon /> Add shipping address
                    </strong>
                  </div>
                  <p className="p-2">
                    No shipping address saved. Add one below to get started.
                  </p>
                </div>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default ProfileShipping;
