import React, { useEffect, useState } from 'react';
import '../profile.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GppGoodIcon from '@mui/icons-material/GppGood';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FirstCard from '../../mobileSection/FirstCard';
import { apiUrl } from '../../../utils/ApiConfig';
import axios from 'axios';
import OrderCard from '../../../components/OrderCard';

import Courouse from '../../../components/Courouse';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import { logOut } from '../../../redux/userSection/userSlice';
import { paymentReset } from '../../../redux/paymentSection/paymentSlice';
import { userProductReset } from '../../../redux/userSection/singleProductSlice';
import { productReset } from '../../../redux/userSection/userProducts';
import { shippingReset } from '../../../redux/shippingSection/shippinSlice';
import OrderSectionSelector from '../../orderpage/OrderSectionSelector';
import { cartReset } from '../../../redux/productSection/cartSlice';
function OverView(props) {
  const { userInfo } = useSelector((state) => state.user);
  const { handleSection } = props;

  const [mostPaidProducts, setMostPaidProducts] = useState([]);
  const [user, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandom = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/random`);
        setMostPaidProducts(data.randomProducts);
        setLoading(false);
      } catch (error) {
        toast.error('error fetching products', {
          toastId: 'unique-toast-id',
          autoClose: 500,
        });
        setLoading(false);
      }
    };

    fetchRandom();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/users/${userInfo?._id}`
        );
        setUsers(data);

        setLoading(false);
      } catch (error) {
        toast.success('error', { toastId: 'unique-toast-id', autoClose: 500 });
        setLoading(false);
      }
    };

    fetchUser();
  }, [userInfo?._id]);

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logOut());
    dispatch(paymentReset());
    dispatch(userProductReset());
    dispatch(productReset());
    dispatch(shippingReset());
    dispatch(cartReset());
    localStorage.removeItem('openSection');

    toast.success('Signed Out', {
      toastId: 'unique-toast-id',
      autoClose: 3000,
    });
  };

  return (
    <div className="mt-1">
      <div className="colBG mb-3">
        <div className="p-2">
          {userInfo?.imgUrl ? (
            <img
              src={userInfo?.imgUrl}
              alt=""
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
              }}
            />
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'grey',
                  opacity: '0.7',
                  borderRadius: '50%',
                }}
              ></div>
              <strong>{userInfo?.name}</strong>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-around py-3">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => handleSection('wishlist')}
            className="d-flex flex-column gap-3 align-items-center"
          >
            <span>
              <FavoriteBorderIcon style={{ width: '35px', height: '35px' }} />
            </span>
            <span>Wishlist</span>
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => handleSection('following')}
            className="d-flex flex-column gap-3 align-items-center"
          >
            <span>
              <GroupAddIcon style={{ width: '35px', height: '35px' }} />
            </span>
            <span>Following</span>
          </div>
          <div className="d-flex flex-column gap-3 align-items-center">
            <span>
              <AccessTimeIcon style={{ width: '35px', height: '35px' }} />
            </span>
            <span>Viewed</span>
          </div>
          <div className="d-flex flex-column gap-3 align-items-center">
            <span>
              <CardMembershipIcon style={{ width: '35px', height: '35px' }} />
            </span>
            <span>Coupons</span>
          </div>
        </div>
      </div>
      <div className="colBG">
        <ListGroup variant="flush">
          <ListGroup.Item className="p-4 d-flex align-items-center justify-content-between">
            <strong>My Orders</strong>
            <Link
              onClick={() => handleSection('order')}
              style={{ opacity: '0.6' }}
              className="text-black"
            >
              View All
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <OrderSectionSelector/>
          </ListGroup.Item>
          <ListGroup.Item>
            <div
              style={{ width: '100%' }}
              className="d-flex  align-items-center  "
            >
              <Courouse own={true} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex gap-2 align-items-center p-3">
              <span>
                <EditNoteOutlinedIcon />
              </span>
              <span>My appeal</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex gap-2 align-items-center p-3">
              <span>
                <RequestPageOutlinedIcon />
              </span>
              <span>In dispute</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/user/personalinfo`} className="d-flex gap-2 align-items-center p-3">
              <span>
                <RequestPageOutlinedIcon />
              </span>
              <span>Settings</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="d-md-none">
            <div className="d-flex gap-2 align-items-center p-3">
              <span>
                <RequestPageOutlinedIcon />
              </span>
              <span onClick={LogoutHandler}>Log Out</span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default OverView;
