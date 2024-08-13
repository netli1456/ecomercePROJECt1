import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cartScreen.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';

import { Link } from 'react-router-dom';
import LoadingBox from '../../utils/LoadingBox';
import NaviBar from '../../navSection/NaviBar';
import ProfileHeader from '../userProfileSection/profileHeader/ProfileHeader';
import { toast } from 'react-toastify';
import Recomended from '../../components/Recomended';
import Footer from '../footerPage/Footer';
import { addWishList } from '../../redux/userSection/userSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addCartItems, removeProduct } from '../../redux/productSection/cartSlice';

function Cartscreen() {
  // ALL STATES

  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const {
    cartItems
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // INCREASE CARTiTEMS QUANTITY

  const increaseQuantity = async (item, quantity) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/products/${item?._id}`);
      if (data.countInStock <= quantity) {
        toast.error('Out of stock', { toastId: 'unique-toast-id' });
        return;
      }
      dispatch(addCartItems({ ...data, quantity }));
    } catch (error) {
      toast.error('Unable to add product', { toastId: 'unique-toast-id' });
    }
  };

  // DELETE CART ITEMS

  const removeCartItem = async (item) => {
    try {
      dispatch(removeProduct(item));
      toast.success('Item removed', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
    } catch (error) {
      toast.error('unable to delete product', { toastId: 'unique-toast-id' });
    }
  };

  // FETCHING CARTITEMS USERS INFORMATION

  useEffect(() => {
    if (cartItems?.length > 0) {
      const cartAllUsers = async () => {
        try {
          const { data } = await axios.get(`${apiUrl}/api/users`);
          setAllUsers(data);
        } catch (error) {
          toast.error('error', { toastId: 'unique-toast-id', autoClose: 500 });
        } finally {
        }
      };

      cartAllUsers();
    }
  }, [cartItems]);

  const cartItemUserId = cartItems?.map((user) => user?.userId);
  const cartUsers = allUsers?.filter((user) =>
    cartItemUserId.includes(user._id)
  );

  //THE NEW CART ITEMS

  const cartItemAndUser = cartItems?.map((item) => {
    const cartUser = cartUsers?.find((user) => user._id === item.userId);
    return {
      ...item,
      cartUser,
    };
  });

  useEffect(() => {
    if (window.onload) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      document.body.style.height = '80vh';
      setLoading(true);
      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height = 'auto';
        setLoading(false);
      };
    }
  }, []);

  const handleWishList = async (id, productId) => {
    try {
      await axios.put(`${apiUrl}/api/products/${id}/${productId}/wishlist`);
      dispatch(addWishList(productId));
      if (userInfo?.wishList.includes(productId)) {
        toast.success('Wishlist removed', { toastId: 'unique-toast-id' });
      } else {
        toast.success('Wishlist added', { toastId: 'unique-toast-id' });
      }
    } catch (error) {
      toast.error('You are not logged in', { toastId: 'unique-toast-id' });
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {' '}
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
        <ProfileHeader cartNav={true} />
      </header>
      <div className="d-none d-md-flex" style={{ backgroundColor: 'white' }}>
        <NaviBar />
      </div>
      <div className="d-none d-md-flex" style={{ marginBottom: '10px' }}></div>
      <div className="d-md-none" style={{ marginBottom: '75px' }}></div>
      <div className="cartBg">
        {loading ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '30vh' }}
          >
            <LoadingBox />
          </div>
        ) : (
          <Container>
            {cartItemAndUser?.length > 0 ? (
              <>
                <div className="d-none d-md-flex">
                  <Row
                    style={{
                      width: '100%',
                      margin: 'auto',
                    }}
                  >
                    <Col
                      md={8}
                      style={{
                        position: 'fixed',
                        height: '100vh',
                        overflow: 'scroll',
                      }}
                      className="scrollbars"
                    >
                      <div className="colBG my-3 p-3">
                        <div className="mb-3 d-none d-md-flex">
                          <h4>
                            <strong>Shopping Cart ({cartItems?.length})</strong>
                          </h4>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <Form.Check aria-label="option 1" />
                            <span>select all items</span>
                          </div>
                          <strong>Delete</strong>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Button
                            variant="lighter"
                            className="bg-lighter text-black"
                            style={{
                              backgroundColor: 'rgb(240, 239, 239)',
                              border: '1px solid black',
                              borderRadius: '5px',
                              fontSize: '14px',
                            }}
                          >
                            <strong>All</strong>
                          </Button>
                          <Button
                            variant="lighter"
                            className="bg-lighter text-black"
                            style={{
                              backgroundColor: 'rgb(240, 239, 239)',
                              borderRadius: '5px',
                              fontSize: '14px',
                            }}
                          >
                            <strong className="d-flex align-items-center">
                              <DoneAllOutlinedIcon
                                style={{ color: 'orange' }}
                              />
                              choice
                            </strong>
                          </Button>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <strong>
                            <span style={{ color: 'red' }}>NGN100.00 </span>
                            saved.
                          </strong>
                          <span>You have reached the maximum discount</span>
                        </div>
                      </div>

                      {cartItemAndUser?.length > 0 &&
                        cartItemAndUser?.map((item) => (
                          <div
                            key={item?._id}
                            className="colBG mb-3 p-3 cartg1"
                          >
                            <div
                              className="mb-3 d-flex justify-content-btween align-items-center gap-2"
                              style={{
                                borderBottom: '2px solid rgb(240, 239, 239',
                              }}
                            >
                              <Form.Check aria-label="option 1" />
                              <Link
                                className="text-black text-decoration-none"
                                to={`/seller/${item?.cartUser?._id}`}
                              >
                                <h5 className="text-capitalize">
                                  {item?.cartUser?.storeName}
                                </h5>
                              </Link>
                            </div>
                            <div
                              style={{ minHeight: '160px', width: '100%' }}
                              className="d-flex  gap-2"
                            >
                              <div
                                className=" d-flex align-items-center "
                                style={{ width: '30%' }}
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
                                      maxHeight: '150px',
                                      borderRadius: '5px',
                                      objectFit:"center"
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
                                  >
                                    <div className="d-flex gap-1">
                                      <strong
                                        style={{
                                          fontSize: '10px',
                                          color: 'white',
                                          backgroundColor: 'red',
                                          height: 'fit-content',
                                        }}
                                        className="p-1"
                                      >
                                        Promo
                                      </strong>
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
                                                  ? `${item?.desc.slice(
                                                      0,
                                                      47
                                                    )}...`
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

                                    <div className="d-flex gap-3">
                                      <div
                                        onClick={() =>
                                          handleWishList(userInfo._id, item._id)
                                        }
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {userInfo?.wishList?.includes(
                                          item?._id
                                        ) ? (
                                          <FavoriteIcon
                                            style={{
                                              color: 'red',
                                            }}
                                          />
                                        ) : (
                                          <FavoriteBorderOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => removeCartItem(item)}
                                      >
                                        <DeleteOutlineIcon />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-2">
                                    {item?.specifications &&
                                      item?.specifications
                                        .slice(0, 1)
                                        .map((spec) => (
                                          <Button
                                            variant="lighter"
                                            style={{
                                              borderRadius: '20px',
                                              backgroundColor:
                                                'rgb(218, 217, 217)',
                                              fontSize: '12px',
                                            }}
                                            className="d-flex align-items-center"
                                            key={spec._id}
                                          >
                                            <strong>
                                              {spec?.description}{' '}
                                            </strong>
                                            <KeyboardArrowRightIcon
                                              style={{ opacity: '0.6' }}
                                            />
                                          </Button>
                                        ))}
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
                                          opacity: '0.7',
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
                                          opacity: '0.7',
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
                            </div>
                          </div>
                        ))}
                    </Col>
                    <Col
                      md={4}
                      style={{ height: '', overflow: 'scroll' }}
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
                          <h6 style={{ fontSize: '15px' }}>NGN10.00</h6>
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
                        <div className=" mb-3">
                          <Link
                            to="/products/shipping"
                            style={{ color: 'inherit' }}
                            className="text-decoration-none d-grid"
                          >
                            <Button
                              variant="danger"
                              style={{ borderRadius: '20px' }}
                            >
                              <strong>Checkout({cartItems?.length})</strong>
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="colBG  my-3 p-3">
                        <div className="mb-4">
                          <h4>
                            <strong>Payment methods</strong>
                          </h4>
                        </div>
                        <div
                          className="d-flex align-items-center pb-4 gap-3 flex-wrap"
                          style={{
                            borderBottom: '1px solid rgb(218, 217, 217)',
                          }}
                        >
                          <div style={{ width: '50px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/mastercard.jpg"
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
                          <div style={{ width: '30px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/paypal.png"
                              alt=""
                            />
                          </div>
                          <div style={{ width: '50px' }}>
                            {' '}
                            <img
                              style={{ width: '100%' }}
                              src="/images/stripe.jpg"
                              alt=""
                            />
                          </div>
                          <div style={{ width: '40px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/visa.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="mb-3">
                            <h6>
                              <strong>Buyer protection</strong>
                            </h6>
                          </div>
                          <div className="d-flex gap-2">
                            <VerifiedUserOutlinedIcon
                              style={{ color: 'green' }}
                            />
                            <strong style={{ opacity: '0.8' }}>
                              Get full refund if the item is not as describe or
                              if is not delivered
                            </strong>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row
                    style={{ width: '100%', margin: 'auto' }}
                    className="scrollbars d-md-none"
                  >
                    <Col md={8}>
                      <div className="colBG my-3 p-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <Form.Check aria-label="option 1" />
                            <span>select all items</span>
                          </div>
                          <strong>Delete</strong>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Button
                            variant="lighter"
                            className="bg-lighter text-black"
                            style={{
                              backgroundColor: 'rgb(240, 239, 239)',
                              border: '1px solid black',
                              borderRadius: '5px',
                              fontSize: '14px',
                            }}
                          >
                            <strong>All</strong>
                          </Button>
                          <Button
                            variant="lighter"
                            className="bg-lighter text-black"
                            style={{
                              backgroundColor: 'rgb(240, 239, 239)',
                              borderRadius: '5px',
                              fontSize: '14px',
                            }}
                          >
                            <strong className="d-flex align-items-center">
                              <DoneAllOutlinedIcon
                                style={{ color: 'orange' }}
                              />
                              choice
                            </strong>
                          </Button>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <strong>
                            <span style={{ color: 'red' }}>NGN100.00 </span>
                            saved.
                          </strong>
                          <span>You have reached the maximum discount</span>
                        </div>
                      </div>

                      {cartItemAndUser?.length > 0 &&
                        cartItemAndUser?.map((item) => (
                          <div
                            key={item?._id}
                            className="colBG mb-3 p-3 cartg1"
                          >
                            <div
                              className="mb-3 d-flex justify-content-btween align-items-center gap-2"
                              style={{
                                borderBottom: '2px solid rgb(240, 239, 239',
                              }}
                            >
                              <Form.Check aria-label="option 1" />
                              <Link
                                className="text-black text-decoration-none"
                                to={`/seller/${item?.cartUser?._id}`}
                              >
                                <h5 className="text-capitalize">
                                  {item?.cartUser?.storeName}
                                </h5>
                              </Link>
                            </div>
                            <div
                              style={{ minHeight: '160px', width: '100%' }}
                              className="d-flex  gap-2"
                            >
                              <div
                                className=" d-flex align-items-center "
                                style={{ width: '30%' }}
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
                                      maxHeight: '150px',
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
                                  >
                                    <div className="d-flex gap-1">
                                      <strong
                                        style={{
                                          fontSize: '10px',
                                          color: 'white',
                                          backgroundColor: 'red',
                                          height: 'fit-content',
                                        }}
                                        className="p-1"
                                      >
                                        Promo
                                      </strong>
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
                                                  ? `${item?.desc.slice(
                                                      0,
                                                      47
                                                    )}...`
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

                                    <div className="d-flex gap-3">
                                      <div>
                                        <FavoriteBorderOutlinedIcon />
                                      </div>
                                      <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => removeCartItem(item)}
                                      >
                                        <DeleteOutlineIcon />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-2">
                                    {item?.specifications &&
                                      item?.specifications
                                        .slice(0, 1)
                                        .map((spec) => (
                                          <Button
                                            variant="lighter"
                                            style={{
                                              borderRadius: '20px',
                                              backgroundColor:
                                                'rgb(218, 217, 217)',
                                              fontSize: '12px',
                                            }}
                                            className="d-flex align-items-center"
                                            key={spec._id}
                                          >
                                            <strong>
                                              {spec?.description}{' '}
                                            </strong>
                                            <KeyboardArrowRightIcon
                                              style={{ opacity: '0.6' }}
                                            />
                                          </Button>
                                        ))}
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
                                          opacity: '0.7',
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
                                          opacity: '0.7',
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
                            </div>
                          </div>
                        ))}
                    </Col>
                    <Col md={4}>
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
                          <h6 style={{ fontSize: '15px' }}>NGN10.00</h6>
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

                        <div className=" mb-3">
                          <Link
                            to="/products/shipping"
                            style={{ color: 'inherit', width: '100%' }}
                            className="text-dec0ration-none d-grid"
                          >
                            <Button
                              variant="danger"
                              style={{ borderRadius: '20px' }}
                            >
                              <strong>Checkout ({cartItems?.length})</strong>
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="colBG mb-3 my-3 p-3">
                        <div className="mb-4">
                          <h4>
                            <strong>Payment methods</strong>
                          </h4>
                        </div>
                        <div
                          className="d-flex align-items-center pb-4 gap-3 flex-wrap"
                          style={{
                            borderBottom: '1px solid rgb(218, 217, 217)',
                          }}
                        >
                          <div style={{ width: '50px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/mastercard.jpg"
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
                          <div style={{ width: '30px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/paypal.png"
                              alt=""
                            />
                          </div>
                          <div style={{ width: '50px' }}>
                            {' '}
                            <img
                              style={{ width: '100%' }}
                              src="/images/stripe.jpg"
                              alt=""
                            />
                          </div>
                          <div style={{ width: '40px' }}>
                            <img
                              style={{ width: '100%' }}
                              src="/images/visa.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="mb-3">
                            <h6>
                              <strong>Buyer protection</strong>
                            </h6>
                          </div>
                          <div className="d-flex gap-2">
                            <VerifiedUserOutlinedIcon
                              style={{ color: 'green' }}
                            />
                            <strong style={{ opacity: '0.8' }}>
                              Get full refund if the item is not as describe or
                              if is not delivered
                            </strong>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <div
                style={{ height: '50vh' }}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="d-flex flex-column gap-3">
                  {!userInfo?._id && (
                    <Button
                      variant="light"
                      style={{
                        width: '300px',
                        color: 'white',
                        backgroundColor: 'red',
                        borderRadius: '20px',
                      }}
                    >
                      <Link
                        className="text-decoration-none text-white fw-bold"
                        to="/login"
                      >
                        Signin
                      </Link>
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
                    <Link
                      className="text-decoration-none text-white fw-bold"
                      to="/"
                    >
                      Explore items
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </Container>
        )}

        <div>
          <Recomended />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Cartscreen;
