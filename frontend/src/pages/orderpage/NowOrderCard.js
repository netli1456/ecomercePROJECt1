import React  from 'react';

import '../cartPage/cartScreen.css'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';


import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { Link, useNavigate } from 'react-router-dom';


import LoadingBox from '../../utils/LoadingBox';

function NowOrderCard({ own, loadingPay, order }) {
    const navigate = useNavigate()
  return (
    <div  style={{ width: '100%' }}>
      {loadingPay ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '10vh' }}
        >
          <LoadingBox />
        </div>
      ) : (
        <div>
          {order ? (
            <div>
              
              <div
                style={{ width: '100%', }}
                className={own ? 'carouselsty ' : ''}
              >
                <Link
                  to={`/orders/${order.orderId}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  key={order.orderId}
                >
                  {order.itemsOrdered.map((item) => (
                    <div
                      key={item?._id}
                      className={
                        own
                          ? ' ownsty colBG mb-3 p-3 cartg1'
                          : 'colBG mb-3 p-3 cartg1'
                      }
                    >
                      <div
                        className="mb-1 d-flex justify-content-btween align-items-center gap-2"
                        style={{
                          borderBottom: '2px solid rgb(240, 239, 239',
                        }}
                      >
                        <div
                          style={{ width: '100%' }}
                          className="d-flex align-items-center justify-content-between py-1"
                        >
                          <div className="d-none d-md-flex">
                            {order.isPaid && order?.isPaid ? (
                              <h5>
                                Paid{' '}
                                <DoneAllOutlinedIcon
                                  style={{ color: 'green' }}
                                />
                              </h5>
                            ) : order?.isPaid && order?.delivered ? (
                              <h5> Processing Delivery</h5>
                            ) : (
                              <h5>Awaiting Payment</h5>
                            )}
                          </div>

                          {/* MOBILE */}

                          <div className=" d-md-none">
                            {order.isPaid && order?.isPaid ? (
                              <strong>
                                Paid{' '}
                                <DoneAllOutlinedIcon
                                  style={{ color: 'green' }}
                                />
                              </strong>
                            ) : order?.isPaid && order?.delivered ? (
                              <strong> Processing Delivery</strong>
                            ) : (
                              <strong>Awaiting Payment</strong>
                            )}
                          </div>
                          {/* MOBILE END */}

                          <div className="d-flex gap-4 align-items-center justify-content-between">
                            <div
                              style={{ fontSize: '14px' }}
                              className="d-none d-md-flex flex-column"
                            >
                              <span>
                                Order Date :{' '}
                                {order.orderDate
                                  ? order.orderDate.slice(0, 10)
                                  : 'no date to show'}
                              </span>

                              <span>Order ID : {order.orderId}</span>
                            </div>
                            <div>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                  navigate(`/orders/${order.orderId}`)
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
                        to={`/seller/${order.user?._id}`}
                      >
                        <div
                          className="text-capitalize "
                          style={{ opacity: '0.8' }}
                        >
                          <div>
                            {order.user.storeName} <NavigateNextOutlinedIcon />
                          </div>
                        </div>
                      </Link>

                      <div
                        style={{ minHeight: '160px', width: '100%' }}
                        className="d-flex py-2  gap-2"
                      >
                        <div
                          className=" d-flex align-items-center d-none d-md-flex "
                          style={{ width: '40%' }}
                        >
                          <Form.Check
                            style={{ width: '15%' }}
                            aria-label="option 1"
                          />
                          <Link
                            style={{ width: '80%' }}
                            to={`/products/${item?._id}`}
                          >
                            <img
                              src={item?.imgUrl}
                              style={{
                                width: '100%',
                                maxHeight: '170px',
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
                                          {item?.desc && item?.desc.length >= 47
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
                                          {item?.desc && item?.desc.length >= 15
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
                            </div>
                            <div style={{ color: 'red' }}>
                              Your exclusive price
                            </div>
                            {item?.freeShipping === true && (
                              <div style={{ color: 'green' }}>
                                Free shipping
                              </div>
                            )}
                            <strong
                              className="my-3 d-md-none"
                              style={{ fontSize: '14px' }}
                            >
                              Total:NGN{order.totalItems.toFixed(2)}
                            </strong>
                          </div>
                        </div>
                        <div
                          style={{ width: '70%' }}
                          className="d-none d-md-flex flex-column align-items-center gap-3"
                        >
                          <strong style={{ fontSize: '14px' }}>
                            Total:NGN{order.totalItems.toFixed(2)}
                          </strong>
                          {order?.isPaid && order?.isPaid ? (
                            ''
                          ) : (
                            <div
                              style={{ width: '70%' }}
                              className="d-grid gap-3"
                            >
                              <Button
                                onClick={() =>
                                  navigate(`/orders/${order.orderId}`)
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
                            </div>
                          )}
                        </div>
                      </div>

                      {/* mobile starts*/}

                      {order?.isPaid && order?.isPaid ? (
                        ''
                      ) : (
                        <div
                          style={{ width: '70%' }}
                          className=" d-md-none d-grid mt-2 mb-4"
                        >
                          <Button
                            onClick={() => navigate(`/orders/${order.orderId}`)}
                            variant="lighter"
                            style={{
                              color: 'white',
                              borderRadius: '20px',
                            }}
                            className="fw-bold buttonCol"
                          >
                            Pay Now
                          </Button>
                        </div>
                      )}
                      {/* MOBILE END */}
                    </div>
                  ))}
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="colBG d-flex align-items-center gap-3 p-3 mb-3">
                <strong>All orders(0)</strong>
                <span>My list (0)</span>
              </div>
              <div
                className="colBG d-flex align-items-center justify-content-center"
                style={{ height: '70vh' }}
              >
                <div className="d-flex flex-column gap-3">
                  <div>
                    <SnowshoeingIcon
                      style={{ width: '100px', height: '100px' }}
                      className="wishListIcon"
                    />
                  </div>
                  <strong> It is empty here</strong>
                  <Button>start shopping</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NowOrderCard;
