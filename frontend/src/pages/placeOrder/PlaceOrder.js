import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../cartPage/cartScreen.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import RemoveIcon from '@mui/icons-material/Remove';

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../../utils/LoadingBox';
import Shipping from '../shippingAddress/Shipping';
import Payment from '../paymentSetion/Payment';
import { shippingSuccess } from '../../redux/shippingSection/shippinSlice';
import UpdateShipping from '../shippingAddress/UpdateShipping';
import NaviBar from '../../navSection/NaviBar';
import ProfileHeader from '../userProfileSection/profileHeader/ProfileHeader';
import { toast } from 'react-toastify';
import Recomended from '../../components/Recomended';
import Footer from '../footerPage/Footer';
import { addCartItems, cartReset } from '../../redux/productSection/cartSlice';

function PlaceOrder() {
  // ALL STATES
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userShippingAddress, setUserShippingAddress] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { payment } = useSelector((state) => state.paymentM);
  const [isOpen, setOpen] = useState(false);
  const { shipping } = useSelector((state) => state.shippingAddress);
  const { userInfo } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState([]);

  const handleOpen = (section) => {
    setOpen(section);
  };

  // INCREASE CARTiTEMS QUANTITY

  const increaseQuantity = async (item, quantity) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/products/${item?._id}`);
      if (data.countInStock <= quantity) {
        toast.error('Out of stock', {
          toastId: 'unique-toast-id',
          autoClose: 3000,
        });
        return;
      }
      dispatch(addCartItems({ ...data, quantity }));
    } catch (error) {
      toast.error('error', { toastId: 'unique-toast-id', autoClose: 2000 });
    }
  };

  // FETCHING CARTITEMS USERS INFORMATION

  useEffect(() => {
    if (cartItems.length > 0) {
      const cartAllUsers = async () => {
        try {
          const { data } = await axios.get(`${apiUrl}/api/users`);
          setAllUsers(data);
        } catch (error) {
          toast.error('error', { toastId: 'unique-toast-id', autoClose: 500 });
        }
      };
      cartAllUsers();
    }
  }, [cartItems]);

  const cartItemUserId = cartItems?.map((user) => user?.userId);
  const cartUsers = allUsers?.filter((user) =>
    cartItemUserId?.includes(user?._id)
  );

  //THE NEW CART ITEMS

  const cartItemAndUser = cartItems?.map((item) => {
    const cartUser = cartUsers?.find((user) => user?._id === item?.userId);
    return {
      ...item,
      cartUser,
    };
  });

  useEffect(() => {
    const fetchShipping = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/shipping/${userInfo?._id}`
        );
        if (!shipping.name) {
          dispatch(shippingSuccess(data));
        }
        setUserShippingAddress(data);
        setLoading(false);
      } catch (error) {
        toast.success('Set shipping address', {
          toastId: 'unique-toast-id',
          autoClose: 5000,
        });
        setLoading(false);
      }
    };
    fetchShipping();
  }, [userInfo?._id, shipping, dispatch]);

  const cartTotalPrice = cartItems?.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );

  const shippingFee = cartTotalPrice > 1000 ? 0 : 100;

  const totalFee = (cartTotalPrice + Number(shippingFee)).toFixed(2);

  const sendOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/orders/${userInfo?._id}`,
        {
          orderItems: cartItems,
          shippingFee: shippingFee,
          shippingAddress: shipping,
          subTotal: totalFee,
          paymentMethod: payment,
        }, {
          headers:{Authorization:`Bearer ${userInfo?.token}`},
        }
      );

      dispatch(cartReset());
      navigate(`/orders/${data._id}`);
      setOrderData(data);
      setLoading(false);
    } catch (error) {
      if (!shipping) {
        handleOpen('shipping');
      } else if (!payment) {
        handleOpen('payment');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo?._id) {
      navigate('/login');
    } else if (orderData) {
      if (orderData?._id) {
        navigate(`/order/${orderData?._id}`);
      }
    } else if (!orderData && cartItems === 0) {
      navigate(`/product/cart`);
    }
  }, [userInfo, navigate, cartItems, orderData]);

  useEffect(() => {
    if (loading === true) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      document.body.style.height = '10vh';
      window.scrollTo(0, 0);

      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height = 'auto';
      };
    }
  }, [loading]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.height = '800px';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    }
  });
  return (
    <div>
      <div className={isOpen ? 'cartBg shippinOpenHeight' : 'cartBg'}>
        {loading ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '10vh' }}
          >
            <LoadingBox />
          </div>
        ) : (
          <div>
            <div>
              <header
                className="d-md-none"
                style={{
                  backgroundColor: 'white',
                  position: 'fixed',
                  width: '100vw',
                  top: -10,
                  zIndex: '999',
                }}
              >
                <ProfileHeader orderNav={true} />
              </header>
              <div
                className="d-none d-md-flex"
                style={{ backgroundColor: 'white' }}
              >
                <NaviBar
                  userShippingAddress={userShippingAddress}
                  setOpen={setOpen}
                />
              </div>
              <div
                className="d-none d-md-flex"
                style={{ marginBottom: '10px' }}
              ></div>
              <div className="d-md-none" style={{ marginBottom: '70px' }}></div>
            </div>
            <Container>
              {cartItemAndUser?.length > 0 ? (
                <div>
                  <div className="d-none d-md-flex">
                    <Row>
                      <Col
                        md={8}
                        style={{
                          position: 'fixed',
                          height: '85vh',
                          overflow: 'scroll',
                        }}
                        className="scrollbars"
                      >
                        <div className="colBG my-3 p-3">
                          <div className="mb-3">
                            <h4 className="p-1">
                              <strong>Shipping Address</strong>
                            </h4>
                            {userShippingAddress?.userId &&
                            userShippingAddress ? (
                              <div className="d-flex flex-column">
                                <div className="d-flex align-items-center text-capitalize gap-2">
                                  <strong style={{ fontSize: '13px' }}>
                                    {userShippingAddress?.name} +234
                                    {userShippingAddress?.phoneNumber}
                                  </strong>
                                  <span></span>
                                </div>
                                <div
                                  style={{ opacity: '0.9' }}
                                  className="d-flex align-items-center gap-2 text-capitalize"
                                >
                                  {' '}
                                  <span>
                                    {userShippingAddress?.streetAddress},{' '}
                                    {userShippingAddress?.state},{' '}
                                    {userShippingAddress?.appartment},{' '}
                                    {userShippingAddress?.localGov},{' '}
                                    {userShippingAddress?.state === 'abuja'
                                      ? `${userShippingAddress?.state}`
                                      : `${userShippingAddress?.name} state`}
                                    , {userShippingAddress?.country},{' '}
                                    {userShippingAddress?.zipCode}
                                  </span>
                                  <span></span>
                                </div>
                                <div
                                  style={{ opacity: '0.9' }}
                                  className="d-flex align-items-center gap-2 text-capitalize"
                                >
                                  <span></span>
                                </div>
                                <Link
                                  onClick={() => handleOpen('updateshipping')}
                                  className=" d-flex align-items-center gap-1"
                                >
                                  Edit
                                </Link>
                              </div>
                            ) : shipping && shipping?.name ? (
                              <div className="d-flex flex-column">
                                <div className="d-flex align-items-center text-capitalize gap-2">
                                  <strong style={{ fontSize: '13px' }}>
                                    {shipping?.name}
                                  </strong>
                                  <span>+234{shipping?.phoneNumber}</span>
                                </div>
                                <div style={{ opacity: '0.9' }}>
                                  {' '}
                                  <span>
                                    {shipping?.streetAddress},{' '}
                                    {shipping?.appartment} {shipping?.state}{' '}
                                    {shipping?.localGov},{' '}
                                    {shipping?.state === 'abuja'
                                      ? `${shipping?.state},`
                                      : `${shipping?.state} state,`}{' '}
                                    {shipping?.country} {shipping?.zipCode}.
                                  </span>
                                </div>

                                <Link onClick={() => handleOpen('shipping')}>
                                  change
                                </Link>
                              </div>
                            ) : (
                              <Link
                                onClick={() => handleOpen('shipping')}
                                className="text-decoration-none d-flex align-items-center gap-1"
                              >
                                <AddOutlinedIcon /> Add New Address
                              </Link>
                            )}
                          </div>
                        </div>

                        <div className="colBG my-3 p-3">
                          <div className="mb-3">
                            <h4 className="p-1">
                              <strong>Payment Method</strong>
                            </h4>
                            {payment ? (
                              <div>
                                {' '}
                                <strong style={{ fontSize: '14px' }}>
                                  {payment}
                                </strong>
                                <Link
                                  onClick={() => handleOpen('payment')}
                                  className="text-decoration-none d-flex align-items-center gap-1"
                                >
                                  Change
                                </Link>
                              </div>
                            ) : (
                              <Link
                                onClick={() => handleOpen('payment')}
                                className="text-decoration-none d-flex align-items-center gap-1"
                              >
                                Select Payment Method
                              </Link>
                            )}
                          </div>
                        </div>

                        {cartItemAndUser?.length > 0 &&
                          cartItemAndUser?.map((item) => (
                            <div key={item?._id} className="colBG mb-3 p-3 ">
                              <div
                                className="mb-3 d-flex justify-content-between align-items-center"
                                style={{
                                  borderBottom: '2px solid rgb(240, 239, 239',
                                  width: '100%',
                                }}
                              >
                                <Link
                                  className="text-black text-decoration-none"
                                  to={`/seller/${item?.cartUser?._id}`}
                                >
                                  <h6 className="text-capitalize">
                                    {item?.cartUser?.storeName}
                                  </h6>
                                </Link>
                                <div>
                                  <ModeEditOutlineOutlinedIcon
                                    style={{ width: '15px', height: '15px' }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{ minHeight: '160px', width: '100%' }}
                                className="d-flex  gap-2"
                              >
                                <div
                                  className=" d-flex align-items-center "
                                  style={{ width: '20%' }}
                                >
                                  <Link
                                    style={{ width: '100%' }}
                                    to={`/products/${item?._id}`}
                                  >
                                    <img
                                      src={item?.imgUrl}
                                      style={{
                                        width: '100%',
                                        maxHeight: '150px',
                                        borderRadius: '5px',
                                      }}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div
                                  style={{ width: '80%' }}
                                  className="d-flex  justify-content-between"
                                >
                                  <div style={{ width: '100%' }}>
                                    <div
                                      className="d-flex gap-1 mb-1  justify-content-between "
                                      style={{ width: '100%' }}
                                    >
                                      <div className="d-flex gap-1">
                                        <div style={{ height: 'fit-content' }}>
                                          <div className="">
                                            <div>
                                              <div className="d-none d-md-flex">
                                                <span
                                                  style={{
                                                    opacity: '',
                                                    fontSize: '',
                                                  }}
                                                  className="text-capitalize"
                                                >
                                                  {item?.desc &&
                                                  item?.desc?.length >= 70
                                                    ? `${item?.desc?.slice(
                                                        0,
                                                        70
                                                      )}...`
                                                    : item?.desc}
                                                </span>
                                              </div>

                                              <div className="d-md-none">
                                                <h6
                                                  style={{
                                                    opacity: '',
                                                    fontSize: '',
                                                  }}
                                                  className="text-capitalize"
                                                >
                                                  {item?.desc &&
                                                  item?.desc?.length >= 15
                                                    ? `${item?.desc.slice(
                                                        0,
                                                        10
                                                      )}...`
                                                    : item?.desc}
                                                </h6>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mb-2">
                                      <Button
                                        variant="lighter"
                                        style={{
                                          borderRadius: '20px',
                                          backgroundColor: 'rgb(218, 217, 217)',
                                          opacity: '0.4',
                                          fontSize: '12px',
                                        }}
                                      >
                                        <strong>{item.brand} </strong>
                                      </Button>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                      <h6>
                                        <strong>
                                          NGN{item?.price.toFixed(2)}
                                        </strong>
                                      </h6>
                                      <div className="d-flex align-items-center gap-2">
                                        <Button
                                          variant="lighter"
                                          style={{
                                            padding: '2px',
                                            borderRadius: '50%',
                                            backgroundColor:
                                              'rgb(218, 217, 217)',
                                            opacity: '0.2',
                                            cursor: 'pointer',
                                          }}
                                          onClick={() =>
                                            increaseQuantity(
                                              item,
                                              item?.quantity - 1
                                            )
                                          }
                                          disabled={item?.quantity === 1}
                                        >
                                          <RemoveIcon />
                                        </Button>
                                        <span>{item?.quantity}</span>
                                        <Button
                                          variant="lighter"
                                          style={{
                                            padding: '2px',
                                            borderRadius: '50%',
                                            backgroundColor:
                                              'rgb(218, 217, 217)',
                                            opacity: '0.2',
                                            cursor: 'pointer',
                                          }}
                                          onClick={() =>
                                            increaseQuantity(
                                              item,
                                              item?.quantity + 1
                                            )
                                          }
                                        >
                                          <AddIcon />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {item?.freeShipping && (
                                <div>
                                  <span
                                    style={{ fontSize: '11px' }}
                                    className="fw-bold"
                                  >
                                    Free shipping: Kaduna N210.00
                                  </span>
                                  <div className="d-flex align-items-center gap-1">
                                    <span
                                      style={{
                                        fontSize: '11px',
                                        opacity: '0.5',
                                      }}
                                      className="fw-bold"
                                    >
                                      Estimated delivery
                                    </span>
                                    <span
                                      style={{ fontSize: '11px' }}
                                      className="fw-bold"
                                    >
                                      Oct 10
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </Col>
                      <Col
                        md={4}
                        style={{
                          position: 'fixed',
                          height: '85vh',
                          overflow: 'scroll',
                        }}
                        className="scrollbars"
                      >
                        <div className="colBG my-3 p-3">
                          <div className="mb-3">
                            <h4>
                              <strong>Summary</strong>
                            </h4>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 style={{ fontSize: '15px' }}>Subtotal</h6>
                            <h6 style={{ fontSize: '15px' }}>
                              NGN
                              {cartItems?.reduce(
                                (a, c) => a + c.price * c.quantity,
                                0
                              )}
                            </h6>
                          </div>
                          <div className="mb-3 d-flex align-items-center justify-content-between">
                            <h6 style={{ fontSize: '15px' }}>Saved</h6>
                            <h6 style={{ fontSize: '15px', color: 'red' }}>
                              NGN100.00
                            </h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 style={{ fontSize: '15px' }}>Shipping Fee</h6>
                            <h6 style={{ fontSize: '15px' }}>
                              {shippingFee.toFixed(2)}
                            </h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h1
                              className="fw-bold"
                              style={{ fontSize: '15px' }}
                            >
                              Total
                            </h1>
                            <h3>
                              NGN
                              {cartItems
                                ?.reduce((a, c) => a + c.price * c.quantity, 0)
                                .toFixed(2)}
                            </h3>
                          </div>
                          <div className="d-grid mb-3">
                            <Button
                              onClick={sendOrder}
                              variant="danger"
                              style={{ borderRadius: '20px' }}
                            >
                              {loading ? (
                                <LoadingBox />
                              ) : (
                                <strong>PlaceOrder</strong>
                              )}
                            </Button>
                          </div>
                          <div className="d-grid">
                            <span
                              style={{ fontSize: '12px', opacity: '0.6' }}
                              className="text-center"
                            >
                              Upon clicking 'Place Order', I confirm I have read
                              and acknowledged{' '}
                              <Link className="text-decoration-none">
                                all terms and policies.
                              </Link>
                            </span>
                          </div>
                        </div>
                        <div className="colBG mb-3 my-3 p-3">
                          <div className="my-3">
                            <div className="d-flex gap-2 mb-2">
                              <VerifiedUserOutlinedIcon
                                style={{ color: 'green' }}
                              />
                              <strong style={{ opacity: '0.8' }}>
                                Aloservices
                              </strong>
                            </div>
                            <div
                              className="mb-2"
                              style={{ opacity: '0.6', fontSize: '14px' }}
                            >
                              {' '}
                              Aloservices keeps your information and payment
                              safe
                            </div>
                            <div className="d-flex align-items-center pb-4 gap-3 flex-wrap">
                              <div style={{ width: '50px' }}>
                                <img
                                  style={{ width: '100%' }}
                                  src="/images/stripe.jpg"
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
                              <div style={{ width: '50px' }}>
                                {' '}
                                <img
                                  style={{ width: '100%' }}
                                  src="/images/gpay_real.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row className="d-md-none">
                    <Col md={8}>
                      <div className="colBG my-3 p-3">
                        <div className="mb-3">
                          <h4 className="p-1">
                            <strong>Shipping Address</strong>
                          </h4>
                          {userShippingAddress?.userId &&
                          userShippingAddress ? (
                            <div className="d-flex flex-column">
                              <div className="d-flex align-items-center text-capitalize gap-2">
                                <strong style={{ fontSize: '13px' }}>
                                  {userShippingAddress?.name} +234
                                  {userShippingAddress?.phoneNumber}
                                </strong>
                                <span></span>
                              </div>
                              <div
                                style={{ opacity: '0.9' }}
                                className="d-flex align-items-center gap-2 text-capitalize"
                              >
                                {' '}
                                <span>
                                  {userShippingAddress?.streetAddress},{' '}
                                  {userShippingAddress?.appartment},{' '}
                                  {userShippingAddress?.localGov}{' '}
                                  {userShippingAddress?.state === 'abuja'
                                    ? `${userShippingAddress?.state}`
                                    : `${userShippingAddress?.name} state`}
                                  , {userShippingAddress?.country},{' '}
                                  {userShippingAddress?.zipCode}
                                </span>
                                <span></span>
                              </div>
                              <div
                                style={{ opacity: '0.9' }}
                                className="d-flex align-items-center gap-2 text-capitalize"
                              >
                                <span></span>
                              </div>
                              <Link
                                onClick={() => handleOpen('updateshipping')}
                                className=" d-flex align-items-center gap-1"
                              >
                                Edit
                              </Link>
                            </div>
                          ) : shipping && shipping?.name ? (
                            <div className="d-flex flex-column">
                              <div className="d-flex align-items-center text-capitalize gap-2">
                                <strong style={{ fontSize: '13px' }}>
                                  {shipping?.name}
                                </strong>
                                <span>+234{shipping?.phoneNumber}</span>
                              </div>
                              <div style={{ opacity: '0.9' }}>
                                {' '}
                                <span>
                                  {shipping?.streetAddress},{' '}
                                  {shipping?.appartment}
                                  {shipping?.localGov}{' '}
                                  {shipping?.state === 'abuja'
                                    ? `${shipping?.state},`
                                    : `${shipping?.state} state,`}{' '}
                                  {shipping?.country} {shipping?.zipCode}.
                                </span>
                              </div>

                              <Link onClick={() => handleOpen('shipping')}>
                                change
                              </Link>
                            </div>
                          ) : (
                            <Link
                              onClick={() => handleOpen('shipping')}
                              className="text-decoration-none d-flex align-items-center gap-1"
                            >
                              <AddOutlinedIcon /> Add New Address
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="colBG my-3 p-3">
                        <div className="mb-3">
                          <h4 className="p-1">
                            <strong>Payment Method</strong>
                          </h4>
                          {payment ? (
                            <div>
                              {' '}
                              <strong style={{ fontSize: '14px' }}>
                                {payment}
                              </strong>
                              <Link
                                onClick={() => handleOpen('payment')}
                                className="text-decoration-none d-flex align-items-center gap-1"
                              >
                                Change
                              </Link>
                            </div>
                          ) : (
                            <Link
                              onClick={() => handleOpen('payment')}
                              className="text-decoration-none d-flex align-items-center gap-1"
                            >
                              Select Payment Method
                            </Link>
                          )}
                        </div>
                      </div>

                      {cartItemAndUser?.length > 0 &&
                        cartItemAndUser?.map((item) => (
                          <div key={item?._id} className="colBG mb-3 p-3 ">
                            <div
                              className="mb-3 d-flex justify-content-between align-items-center"
                              style={{
                                borderBottom: '2px solid rgb(240, 239, 239',
                                width: '100%',
                              }}
                            >
                              <Link
                                className="text-black text-decoration-none"
                                to={`/seller/${item?.cartUser?._id}`}
                              >
                                <h6 className="text-capitalize">
                                  {item?.cartUser?.storeName}
                                </h6>
                              </Link>
                              <div>
                                <ModeEditOutlineOutlinedIcon
                                  style={{ width: '15px', height: '15px' }}
                                />
                              </div>
                            </div>
                            <div
                              style={{ minHeight: '160px', width: '100%' }}
                              className="d-flex  gap-2"
                            >
                              <div
                                className=" d-flex align-items-center "
                                style={{ width: '20%' }}
                              >
                                <Link
                                  style={{ width: '100%' }}
                                  to={`/products/${item?._id}`}
                                >
                                  <img
                                    src={item?.imgUrl}
                                    style={{
                                      width: '100%',
                                      maxHeight: '150px',
                                      borderRadius: '5px',
                                    }}
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div
                                style={{ width: '80%' }}
                                className="d-flex  justify-content-between"
                              >
                                <div style={{ width: '100%' }}>
                                  <div
                                    className="d-flex gap-1 mb-1  justify-content-between "
                                    style={{ width: '100%' }}
                                  >
                                    <div className="d-flex gap-1">
                                      <div style={{ height: 'fit-content' }}>
                                        <div className="">
                                          <div>
                                            <div className="d-none d-md-flex">
                                              <span
                                                style={{
                                                  opacity: '',
                                                  fontSize: '',
                                                }}
                                                className="text-capitalize"
                                              >
                                                {item?.desc &&
                                                item?.desc?.length >= 70
                                                  ? `${item?.desc?.slice(
                                                      0,
                                                      70
                                                    )}...`
                                                  : item?.desc}
                                              </span>
                                            </div>

                                            <div className="d-md-none">
                                              <h6
                                                style={{
                                                  opacity: '',
                                                  fontSize: '',
                                                }}
                                                className="text-capitalize"
                                              >
                                                {item?.desc &&
                                                item?.desc?.length >= 15
                                                  ? `${item?.desc.slice(
                                                      0,
                                                      10
                                                    )}...`
                                                  : item?.desc}
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-2">
                                    <Button
                                      variant="lighter"
                                      style={{
                                        borderRadius: '20px',
                                        backgroundColor: 'rgb(218, 217, 217)',
                                        opacity: '0.4',
                                        fontSize: '12px',
                                      }}
                                    >
                                      <strong>{item.brand} </strong>
                                    </Button>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h6>
                                      <strong>
                                        NGN{item?.price.toFixed(2)}
                                      </strong>
                                    </h6>
                                    <div className="d-flex align-items-center gap-2">
                                      <Button
                                        variant="lighter"
                                        style={{
                                          padding: '2px',
                                          borderRadius: '50%',
                                          backgroundColor: 'rgb(218, 217, 217)',
                                          opacity: '0.2',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                          increaseQuantity(
                                            item,
                                            item?.quantity - 1
                                          )
                                        }
                                        disabled={item?.quantity === 1}
                                      >
                                        <RemoveIcon />
                                      </Button>
                                      <span>{item?.quantity}</span>
                                      <Button
                                        variant="lighter"
                                        style={{
                                          padding: '2px',
                                          borderRadius: '50%',
                                          backgroundColor: 'rgb(218, 217, 217)',
                                          opacity: '0.2',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                          increaseQuantity(
                                            item,
                                            item?.quantity + 1
                                          )
                                        }
                                      >
                                        <AddIcon />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {item?.freeShipping && (
                              <div>
                                <span
                                  style={{ fontSize: '11px' }}
                                  className="fw-bold"
                                >
                                  Free shipping: Kaduna N210.00
                                </span>
                                <div className="d-flex align-items-center gap-1">
                                  <span
                                    style={{ fontSize: '11px', opacity: '0.5' }}
                                    className="fw-bold"
                                  >
                                    Estimated delivery
                                  </span>
                                  <span
                                    style={{ fontSize: '11px' }}
                                    className="fw-bold"
                                  >
                                    Oct 10
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </Col>
                    <Col md={4} className="scrollbars  align-items-center">
                      <div className=" my-3 colBG p-3">
                        <div className="mb-3">
                          <h4>
                            <strong>Summary</strong>
                          </h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 style={{ fontSize: '15px' }}>Subtotal</h6>
                          <h6 style={{ fontSize: '15px' }}>
                            NGN
                            {cartItems?.reduce(
                              (a, c) => a + c.price * c.quantity,
                              0
                            )}
                          </h6>
                        </div>
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                          <h6 style={{ fontSize: '15px' }}>Saved</h6>
                          <h6 style={{ fontSize: '15px', color: 'red' }}>
                            NGN100.00
                          </h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 style={{ fontSize: '15px' }}>Shipping Fee</h6>
                          <h6 style={{ fontSize: '15px' }}>
                            {shippingFee.toFixed(2)}
                          </h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h1 className="fw-bold" style={{ fontSize: '15px' }}>
                            Total
                          </h1>
                          <h3>
                            NGN
                            {cartItems
                              ?.reduce((a, c) => a + c.price * c.quantity, 0)
                              .toFixed(2)}
                          </h3>
                        </div>
                        <div className="d-grid mb-3">
                          <Button
                            onClick={sendOrder}
                            variant="danger"
                            style={{ borderRadius: '20px' }}
                          >
                            {loading ? (
                              <LoadingBox />
                            ) : (
                              <strong>PlaceOrder</strong>
                            )}
                          </Button>
                        </div>
                        <div className="d-grid">
                          <span
                            style={{ fontSize: '12px', opacity: '0.6' }}
                            className="text-center"
                          >
                            Upon clicking 'Place Order', I confirm I have read
                            and acknowledged{' '}
                            <Link className="text-decoration-none">
                              all terms and policies.
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="colBG mb-3 my-3 p-3">
                        <div className="my-3">
                          <div className="d-flex gap-2 mb-2">
                            <VerifiedUserOutlinedIcon
                              style={{ color: 'green' }}
                            />
                            <strong style={{ opacity: '0.8' }}>
                              Aloservices
                            </strong>
                          </div>
                          <div
                            className="mb-2"
                            style={{ opacity: '0.6', fontSize: '14px' }}
                          >
                            {' '}
                            Aloservices keeps your information and payment safe
                          </div>
                          <div className="d-flex align-items-center pb-4 gap-3 flex-wrap">
                            <div style={{ width: '50px' }}>
                              <img
                                style={{ width: '100%' }}
                                src="/images/stripe.jpg"
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
                            <div style={{ width: '50px' }}>
                              {' '}
                              <img
                                style={{ width: '100%' }}
                                src="/images/gpay_real.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <div
                    style={{ height: '50vh' }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div className="d-flex flex-column gap-3">
                      {!userInfo && (
                        <Button
                          variant="light"
                          style={{
                            width: '300px',
                            color: 'white',
                            backgroundColor: 'red',
                            borderRadius: '20px',
                          }}
                        >
                          <strong>Signin</strong>
                        </Button>
                      )}

                      <Button
                        variant="light"
                        style={{
                          width: '300px',
                          color: 'white',
                          borderRadius: '20px',
                        }}
                        className="bg-danger "
                      >
                        {' '}
                        <strong>Expolre items</strong>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Container>
            {isOpen === 'shipping' && (
              <div className="">
                <div
                  className="d-flex flex-column justify-content-center align-items-center cartOpacity"
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '100vw',
                    height: '100vh',
                  }}
                >
                  <Shipping setOpen={setOpen} />
                </div>
              </div>
            )}

            {isOpen === 'payment' && (
              <div
                className="d-flex flex-column justify-content-center align-items-center cartOpacity"
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                }}
              >
                <Payment setOpen={setOpen} />
              </div>
            )}

            {isOpen === 'updateshipping' && (
              <div
                className="d-flex flex-column justify-content-center align-items-center cartOpacity"
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                }}
              >
                <UpdateShipping
                  userShippingAddress={userShippingAddress}
                  setOpen={setOpen}
                />
              </div>
            )}
            <div>
              <Recomended />
            </div>
            {!isOpen && (
              <footer>
                <Footer />
              </footer>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
