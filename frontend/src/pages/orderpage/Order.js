import React, { useEffect, useReducer, useState } from 'react';
import LoadingBox from '../../utils/LoadingBox';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../utils/ApiConfig';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import NaviBar from '../../navSection/NaviBar';
import { toast } from 'react-toastify';
import Footer from '../footerPage/Footer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, order: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    case 'SUCCESSPAY_START':
      return { ...state, loadingPay: true };
    case 'SUCCESS_PAY':
      return { ...state, paySuccess: true, loadingPay: false };
    case 'SUCCESSPAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAYRESET':
      return { ...state, paySuccess: false, loadingPay: false };
    default:
      return state;
  }
};

function Order() {
  const [{ loading, order, error, loadingPay, paySuccess }, dispatch] =
    useReducer(reducer, {
      loading: false,
      order: {},
      error: false,
      loadingPay: false,
      paySuccess: false,
    });

  const params = useParams();
  const { id: orderId } = params;
  const [allUsers, setAllUsers] = useState();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.subTotal },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  useEffect(()=>{
    if(!userInfo?.name){
      navigate('/login');
    }
  })

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'SUCCESSPAY_START' });
        const { data } = await axios.put(
          `${apiUrl}/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'SUCCESS_PAY', payload: data });
        toast.success('Order paid successfully ',{toastId: "unique-toast-id", autoClose:5000}, );
      } catch (error) {
        dispatch({ type: 'SUCCESSPAY_FAIL' });
        toast.error(error,'error ',{toastId: "unique-toast-id", autoClose:1000}, );
      }
    });
  }

  function onError(err) {
    toast.error(err,'error ',{toastId: "unique-toast-id", autoClose:5000}, );
  }

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const { data } = await axios.get(`${apiUrl}/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
       
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL' });
        toast.error(error,'error ',{toastId: "unique-toast-id", autoClose:1000}, );
      }
    };
    if (!order._id || paySuccess || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (paySuccess) {
        dispatch({ type: 'PAYRESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(`${apiUrl}/api/keys/paypal`);
        payPalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'USD' },
        });
       
        payPalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order._id, payPalDispatch, orderId, paySuccess]);



  useEffect(() => {
    if (order._id) {
      try {
        const cartAllUsers = async () => {
          const { data } = await axios.get(`${apiUrl}/api/users`);

          setAllUsers(data);
        };
        cartAllUsers();
      } catch (error) {
        toast.error(error,'error ',{toastId: "unique-toast-id", autoClose:500}, );
      }
    }
  }, [order]);

  const cartItemUserId = order.orderItems?.map((user) => user?.userId);
  const cartUsers = allUsers?.filter((user) =>
    cartItemUserId?.includes(user?._id)
  );

  const orderItems = order.orderItems?.map((item) => {
    const cartUser = cartUsers?.find((user) => user?._id === item?.userId);
    const userId = item.userId;
    return {
      ...item,
      cartUser,
      userId: userId,
    };
  });

  

  useEffect(() => {
    if (userInfo === null || !userInfo._id) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if(loading === true){
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
       document.body.style.height="50vh"

      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height="auto"

      };
    }
  }, [loading]);

  return (
    <div>
      
      <div >
        <div>
          {loading ? (
            <div style={{height:"80vh"}} className="d-flex align-items-center justify-content-center">
              <LoadingBox></LoadingBox>
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div >
              <NaviBar />
              <div className='cartBg'>
            <Container className=" py-4">
              <Row>
                <Col md={8}>
                  <div
                    className="colBG p-3 d-flex mb-3 justify-content-between"
                    style={{}}
                  >
                    <div className="d-flex gap-2 ">
                      <div>
                        <EventNoteOutlinedIcon />
                      </div>
                      <div>
                        <div>Order ID: {order._id}</div>
                        <div>
                          Order placed on :{' '}
                          {order.createdAt
                            ? order.createdAt.slice(0, 10)
                            : 'No date to show'}
                        </div>
                      </div>
                    </div>
                    <div>
                      {order.delivered ? (
                        <div
                          className="colBG d-flex align-items-center justify-content-center"
                          style={{ width: '' }}
                        >
                          <div className="d-flex gap-2">
                            <div>
                              <LocalShippingOutlinedIcon />
                            </div>
                            <strong>delivered on {order.deliveredAt}</strong>
                          </div>
                        </div>
                      ) : (
                        <div className="  colBG " style={{}}>
                          <div className="  d-flex align-items-center justify-content-center">
                            <div className="d-flex gap-2">
                              <div>
                                <LocalShippingOutlinedIcon />
                              </div>
                              <strong>
                                {order.delivered ? (
                                  <div>delivered on {order.deliveredAt}</div>
                                ) : (
                                  'Not Delivered'
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.isPaid ? (
                    <div
                      className=" colBG mb-3  d-flex align-items-center justify-content-center"
                      style={{ width: '' }}
                    >
                      <div
                        style={{ width: '100%' }}
                        className="d-flex align-items-center justify-content-center  p-4 payBG"
                      >
                        <div className="d-flex gap-2">
                          <div>
                            <LocalShippingOutlinedIcon />
                          </div>
                          <strong>
                            Paid with {order.paymentMethod} On the{' '}
                            {order.paidAt}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3  colBG " style={{}}>
                      <div className="messageBG p-4 d-flex align-items-center justify-content-center">
                        <div className="d-flex gap-2">
                          <div>
                            <LocalShippingOutlinedIcon />
                          </div>
                          <strong>
                            <div>Order Not Paid</div>
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className=" mb-3">
                    <div className="colBG p-3" style={{}}>
                      <div className=" d-flex gap-2">
                        <LocationOnOutlinedIcon />
                        <div>
                          <div style={{ opacity: '0.8' }}>
                            {order?.shippingAddress?.name}
                          </div>
                          <div>{order.shippingAddress?.phoneNumber}</div>
                          <div>
                            {' '}
                            {order.shippingAddress?.streetAddress}{' '}
                            {order.shippingAddress?.state}{' '}
                            {order.shippingAddress?.appartment}
                            {order.shippingAddress?.localGov},
                            {order.shippingAddress?.state === 'abuja'
                              ? `${order.shippingAddress?.state},`
                              : `${order.shippingAddress?.name} state,`}{' '}
                            {order.shippingAddress?.country},
                            {order.shippingAddress?.zipCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {orderItems?.map((item) => (
                    <div key={item?._id} className="colBG mb-3 px-3 py-2 ">
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
                          {allUsers?.map((user) => (
                            <div key={user._id}>
                              {user._id === item.userId ? (
                                <h6>
                                  {user.storeName} <NavigateNextOutlinedIcon />
                                </h6>
                              ) : null}
                            </div>
                          ))}
                        </Link>
                        <div></div>
                      </div>
                      <div
                        style={{ minHeight: '160px', width: '100%' }}
                        className="d-flex  gap-2"
                      >
                        <div
                          className=" d-flex align-items-center "
                          style={{ width: '23%' }}
                        >
                          <Link
                            style={{ width: '100%' }}
                            to={`/products/${item?._id}`}
                          >
                            <img
                              src={item?.imgUrl}
                              style={{
                                width: '100%',
                                maxHeight: '180px',
                                borderRadius: '5px',
                              }}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div
                          style={{ width: '70%' }}
                          className="d-flex  justify-content-between"
                        >
                          <div style={{ width: '100%' }}>
                            <div
                              className="d-flex gap-1 mb-1  justify-content-between "
                              style={{ width: '100%' }}
                            ></div>

                            <div className="mb-2">
                              <Button
                                variant="lighter"
                                style={{
                                  borderRadius: '20px',
                                  backgroundColor: 'rgb(218, 217, 217)',
                                  opacity: '',
                                  fontSize: '12px',
                                }}
                              >
                                <strong>{item.brand} </strong>
                              </Button>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <h6>
                                <strong>NGN{item?.price.toFixed(2)}</strong>
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
                                ></Button>
                                <strong> {item?.quantity} Piece(s)</strong>
                                <Button
                                  variant="lighter"
                                  style={{
                                    padding: '2px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgb(218, 217, 217)',
                                    opacity: '0.2',
                                    cursor: 'pointer',
                                  }}
                                ></Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Col>
                <Col md={4}>
                  <div>
                    <div className="colBG p-3 mb-3">
                      <div className="mb-3">
                        <h4>
                          <strong>Summary</strong>
                        </h4>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 style={{ fontSize: '15px' }}>Shipping Fee</h6>
                        <h6 style={{ fontSize: '15px' }}>
                          {order?.shippingFee?.toFixed(2)}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h1 className="fw-bold" style={{ fontSize: '15px' }}>
                          Order Total
                        </h1>
                        <h3>
                          NGN
                          {order?.subTotal?.toFixed(2)}
                        </h3>
                      </div>
                    </div>
                    <div className="colBG ">
                      {!order?.isPaid && (
                        <div className="d-grid p-3 mb-3">
                          {isPending ? (
                            <div className="d-flex align-items-center justify-content-center">
                              <LoadingBox></LoadingBox>
                            </div>
                          ) : (
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          )}
                          {loadingPay && (
                            <div className="d-flex align-items-center justify-content-center">
                              <LoadingBox></LoadingBox>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            </div>
            <footer>
            <Footer />
          </footer>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
}

export default Order;
