import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import '../pages/cartPage/cartScreen.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Carousel from 'react-bootstrap/Carousel';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { apiUrl } from '../utils/ApiConfig';
import axios from 'axios';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../utils/LoadingBox';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loadingPay: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, order: action.payload, loadingPay: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loadingPay: false };
    default:
      return state;
  }
};

function Courouse({ own }) {
  const [{ order, error, loadingPay }, dispatch] = useReducer(reducer, {
    order: [],
    error: false,
    loadingPay: false,
  });
  // ALL STATES

  const [allUsers, setAllUsers] = useState([]);

  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/orders/${userInfo?._id}/all`
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL' });
        toast.error('error',{toastId: "unique-toast-id", autoClose:500}, );
      }
    };
    fetchOrder();
  }, [userInfo]);

  useEffect(() => {
    if (order) {
      setLoading(true);
      try {
        const cartAllUsers = async () => {
          const { data } = await axios.get(`${apiUrl}/api/users`);

          setAllUsers(data);
        };
        cartAllUsers();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('error',{toastId: "unique-toast-id", autoClose:500}, );
      }
    }
  }, [order]);

  useEffect(() => {
    if (order) {
      try {
        const cartAllUsers = async () => {
          const { data } = await axios.get(`${apiUrl}/api/users`);

          setAllUsers(data);
        };
        cartAllUsers();
      } catch (error) {
        toast.error('error',{toastId: "unique-toast-id", autoClose:500}, );
      }
    }
  }, [order]);

  const testArraySep = order?.map((object) => object);

  const singleArray = testArraySep?.map((item) => {
    const orderId = item?._id;
    const itemsOrdered = item.orderItems.slice(0, 1).map((items) => items);
    const shippingFee = item.shippingFee;
    const totalItems = item.subTotal;
    const userId = item.userId;
    const orderDate = item.createdAt;
    const isPaid = item.isPaid;
    const delivered = item.delivered;
    const user = allUsers.find((user) => user.id === itemsOrdered?.userId);

    return {
      itemsOrdered: itemsOrdered,
      shippingFee: shippingFee,
      totalItems: totalItems,
      orderId: orderId,
      user: user,
      userId: userId,
      orderDate: orderDate,
      isPaid: isPaid,
      delivered: delivered,
    };
  });

  

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div className="cartBg p-2" style={{ width: '100%' }}>
      {loadingPay ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '10vh' }}
        >
          <LoadingBox />
        </div>
      ) : (
        <div>
          <div>
            <Carousel
              style={{ width: '100%' }}
              className={own ? 'carouselsty' : ''}
            >
              {singleArray?.length > 0 &&
                singleArray?.map((orders) => (
                  <Carousel.Item key={orders.orderId}>
                    {orders.itemsOrdered.map((item) => (
                      <Link
                        to={`/orders/${orders.orderId}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        key={item?._id}
                        className={
                          own ? ' ownsty    cartg1' : 'colBG mb-3 p-3 cartg1'
                        }
                      >
                        <div
                          className="mb-1 d-flex justify-content-btween align-items-center "
                          style={{
                            borderBottom: '2px solid rgb(240, 239, 239',
                          }}
                        >
                          <div
                            style={{ width: '100%' }}
                            className="d-flex align-items-center justify-content-between py-1"
                          >
                            <div className="d-none d-md-flex">
                              {orders.isPaid && orders?.isPaid ? (
                                <h5>
                                  Paid{' '}
                                  <DoneAllOutlinedIcon
                                    style={{ color: 'green' }}
                                  />
                                </h5>
                              ) : orders?.isPaid && orders?.delivered ? (
                                <h5> Processing Delivery</h5>
                              ) : (
                                <h5>Awaiting Payment</h5>
                              )}
                            </div>

                            {/* MOBILE */}

                            <div className=" d-md-none">
                              {orders.isPaid && orders?.isPaid ? (
                                <strong>
                                  Paid{' '}
                                  <DoneAllOutlinedIcon
                                    style={{ color: 'green' }}
                                  />
                                </strong>
                              ) : orders?.isPaid && orders?.delivered ? (
                                <strong> Processing Delivery</strong>
                              ) : (
                                <strong>Awaiting Payment</strong>
                              )}
                            </div>
                            {/* MOBILE END */}

                            <div className="d-flex gap-4 align-items-center justify-content-between">
                              <div
                                style={{ fontSize: '14px' }}
                                className=" flex-column d-none d-md-flex"
                              >
                                <span>
                                  Order Date :{' '}
                                  {orders.orderDate
                                    ? orders.orderDate.slice(0, 10)
                                    : 'no date to show'}
                                </span>

                                <span>Order ID : {orders.orderId}</span>
                              </div>
                              <div>
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    navigate(`/orders/${orders.orderId}`)
                                  }
                                  className="text-decoration-none text-black"
                                >
                                  <strong>
                                    Order Details <NavigateNextOutlinedIcon />
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Link
                          className="text-black pb-1 text-decoration-none"
                          to={`/seller/${orders.user?._id}`}
                        >
                          <div
                            className="text-capitalize "
                            style={{ opacity: '0.8' }}
                          >
                            {allUsers?.map((user) =>
                              user._id === item.userId ? (
                                <div key={user?._id}>
                                  {user.storeName} <NavigateNextOutlinedIcon />
                                </div>
                              ) : null
                            )}
                          </div>
                        </Link>

                        <div
                          style={{ minHeight: '120px', width: '100%' }}
                          className="d-flex py-2  gap-2"
                        >
                          <div
                            className="  align-items-center d-none d-md-flex"
                            style={{ width: '40%' }}
                          >
                            <Link
                              style={{ width: '80%' }}
                              to={`/products/${item?._id}`}
                            >
                              <img
                                src={item?.imgUrl}
                                style={{
                                  width: '100%',
                                  maxHeight: '140px',
                                  borderRadius: '5px',
                                  objectFit: 'cover',
                                }}
                                alt=""
                              />
                            </Link>
                          </div>

                          {/* Mobile Start*/}
                          <div
                            className=" d-flex align-items-center d-md-none"
                            style={{ width: '100%' }}
                          >
                            <Link
                              style={{ width: '100%' }}
                              to={`/products/${item?._id}`}
                            >
                              <img
                                src={item?.imgUrl}
                                style={{
                                  width: '100%',
                                  maxHeight: '140px',
                                  borderRadius: '5px',
                                  objectFit: 'cover',
                                }}
                                alt=""
                              />
                            </Link>
                          </div>

                          {/* MOBILE END */}

                          <div
                            style={{ width: '100%' }}
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
                                          <h6
                                            style={{
                                              opacity: '0.8',
                                              fontSize: '',
                                            }}
                                            className="text-capitalize"
                                          >
                                            {item?.desc &&
                                            item?.desc.length >= 47
                                              ? `${item?.desc.slice(0, 47)}...`
                                              : item?.desc}
                                          </h6>
                                        </div>

                                        <div className="d-md-none">
                                          <h6
                                            style={{
                                              opacity: '0.8',
                                              fontSize: '',
                                            }}
                                            className="text-capitalize"
                                          >
                                            {item?.desc &&
                                            item?.desc.length >= 15
                                              ? `${item?.desc.slice(0, 10)}...`
                                              : item?.desc}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex align-items-center justify-content-between">
                                <h6>
                                  <strong>NGN{item?.price.toFixed(2)}</strong>
                                </h6>
                                <div className="d-flex align-items-center gap-2"></div>
                              </div>
                              <div style={{ color: 'red' }}>
                                Your exclusive price
                              </div>
                              {item?.freeShipping === true && (
                                <div style={{ color: 'green' }}>
                                  Free shipping
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            style={{ width: '70%' }}
                            className=" flex-column align-items-center gap-3 d-none d-md-flex"
                          >
                            <strong style={{ fontSize: '14px' }}>
                              Total:NGN{orders.totalItems.toFixed(2)}
                            </strong>

                           { orders?.isPaid && orders?.isPaid ? "" :<div
                              style={{ width: '70%' }}
                              className=" d-grid gap-3"
                            >
                              <Button
                                onClick={() =>
                                  navigate(`/orders/${orders.orderId}`)
                                }
                                variant="lighter"
                                style={{
                                  color: 'white',
                                  borderRadius: '20px',
                                }}
                                className="fw-bold buttonCol"
                              >
                                Pay Now
                              </Button>
                              <Button
                                style={{
                                  border: '1px solid black',
                                  borderRadius: '20px',
                                }}
                                className="fw-bold"
                                variant="lighter"
                              >
                                Edit Address
                              </Button>
                            </div>}
                          </div>
                        </div>

                        {/* mobile starts*/}
                        {orders?.isPaid && orders?.isPaid ? "" : <div style={{ width: '70%' }} className=" d-md-none d-grid mt-2 mb-4">
                          <Button
                            onClick={() =>
                              navigate(`/orders/${orders.orderId}`)
                            }
                            variant="lighter"
                            style={{
                              color: 'white',
                              borderRadius: '20px',
                            }}
                            className="fw-bold buttonCol"
                          >
                            Pay Now
                          </Button>
                        </div>}
                        {/* MOBILE END */}
                      </Link>
                    ))}
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courouse;
