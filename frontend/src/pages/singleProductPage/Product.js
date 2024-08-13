import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Product.css';
import ProductHeader from './ProductHeader';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ProductSpecification from './ProductSpecification';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFail } from '../../redux/userSection/userProducts';
import HomeCard from '../../components/HomeCard';
import FirstCard from '../mobileSection/FirstCard';
import LoadingBox from '../../utils/LoadingBox';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import NaviBar from '../../navSection/NaviBar';
import { toast } from 'react-toastify';
import Footer from '../footerPage/Footer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addWishList } from '../../redux/userSection/userSlice';
import { addCartItems } from '../../redux/productSection/cartSlice';

function Product(props) {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { shipping } = useSelector((state) => state.shippingAddress);
  const dispatch = useDispatch();
  const [userProduct, setUserProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchSingleproduct = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Error', { toastId: 'unique-toast-id', autoClose: 500 });
      } finally {
        setLoading(false);
      }
    };

    fetchSingleproduct();
  }, [id]);

  console.log(cartItems);

  const handleAddProduct = async (productid) => {
    try {
      const existItem = cartItems?.find(
        (item) => item?._id === productid
      );
      const quantity = existItem ? existItem?.quantity + 1 : 1;
      const { data } = await axios.get(`${apiUrl}/api/products/${productid}`);
      if (data?.countInStock < quantity) {
        return toast.error('Out of stock', {
          toastId: 'unique-toast-id',
          autoClose: 2000,
        });
      }
      dispatch(addCartItems({ ...product, quantity }));
      toast.success('Added to cart', {
        toastId: 'unique-toast-id',
        autoClose: 200,
      });
    } catch (error) {
      toast.error('Unable to add to cart', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
    }
  };

  const originalPrice = product?.price;
  const discountAmount = product?.discount;
  const discountPercentage = discountAmount / 100;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage).toFixed(2);

  const formattedDiscountPercentage = (discountPercentage * 100).toFixed(0);

  const productId = product && product?.userId;

  useEffect(() => {
    if (productId) {
      const fetchUserProducts = async () => {
        try {
          const { data } = await axios.get(
            `${apiUrl}/api/products/userproducts/${productId}`
          );

          setUserProducts(data);
        } catch (error) {
          toast.error('Unable to fetch product', {
            toastId: 'unique-toast-id',
            autoClose: 200,
          });
        }
      };
      fetchUserProducts();
    }
  }, [productId, dispatch]);

  const mostPaidProducts = userProduct?.product?.filter(
    (products) => products?.mostPaidFor > 0 && products?._id !== product?._id
  );

  const userPostUserName = userProduct && userProduct.user;

  const mostPaidProductIds = mostPaidProducts?.map((product) => product?._id);

  const productLowDiscountprice = mostPaidProducts
    ?.slice(0, 7)
    .map((product) => {
      const originalPrice = product?.price;
      const discountPercentage = product?.discount;
      const discountDecimal = discountPercentage / 100;
      const discountedPrice = (
        originalPrice -
        originalPrice * discountDecimal
      ).toFixed(2);
      return {
        ...product,
        discountedPrice,
      };
    });

  const allUserProductId =
    userProduct &&
    userProduct?.product?.filter(
      (products) =>
        !mostPaidProductIds?.includes(products?._id) &&
        products?._id !== product?._id
    );

  const cartProductsId = cartItems?.map((item) => item);
  const currentCartProductId = cartProductsId?.filter(
    (id) => id?._id === product?._id
  );
  const navigate = useNavigate();
  const handleBuy = () => {
    if (cartItems.find((id) => id === theProduct)) {
      navigate('/products/shipping');
    } else {
      handleAddProduct();
    }
  };

  let theProduct = null;

  if (currentCartProductId?.length > 0) {
    theProduct = currentCartProductId[0];
  } else {
  }

  if (theProduct) {
  } else {
  }

  const IncreaseQuantity = async (item, quantity) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/products/${item?._id}`);
      if (data.countInStock < quantity) {
        return toast.error('Out of stock', {
          toastId: 'unique-toast-id',
          autoClose: 500,
        });
      }
      dispatch(addCartItems({ ...data, quantity }));
    } catch (error) {
      toast.error('Unable to add', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    if (loading === true) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      document.body.style.height = '20vh';
      window.scrollTo(0, 0);

      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height = 'auto';
      };
    }
  }, [loading]);

  const handleWishList = async (id, productId) => {
    try {
      await axios.put(`${apiUrl}/api/products/${id}/${productId}/wishlist`);
      dispatch(addWishList(productId));
      if (userInfo?.wishList.includes(product._id)) {
        toast.success('Wishlist removed', { toastId: 'unique-toast-id' });
      } else {
        toast.success('Wishlist added', { toastId: 'unique-toast-id' });
      }
    } catch (error) {
      toast.error('You are not logged in', { toastId: 'unique-toast-id' });
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {loading ? (
        <div
          style={{ height: '20vh' }}
          className="d-flex justify-content-center align-items-center"
        >
          <LoadingBox />
        </div>
      ) : (
        <div className="">
          <div
            style={{
              backgroundColor: 'white',
              position: 'fixed',
              width: '100vw',
              top: -10,
              zIndex: '999',
            }}
          >
            <NaviBar />
          </div>
          <div
            className="d-none d-md-flex"
            style={{ marginBottom: '100px' }}
          ></div>
          <div className="d-md-none" style={{ marginBottom: '83px' }}></div>
          <div>
            <ProductHeader product={productId} />
          </div>
          <Row className="bgNavSize2 mb-5 ">
            <Col md={5}>
              <div>
                <img
                  src={product?.imgUrl}
                  alt=""
                  style={{
                    borderRadius: '10px',
                    width: '100%',
                    maxHeight: '460px',
                    objectFit: 'cover',
                  }}
                  className="mb-3"
                />
              </div>
            </Col>
            <Col md={4} className=" scrollbars">
              <ListGroup variant="flush">
                <ListGroup.Item className="mb-3 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {' '}
                      <h4>{product?.name}</h4>
                      <p className="">{product?.countInStock} in stocks</p>
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handleWishList(userInfo?._id, product?._id)
                      }
                    >
                      {userInfo?.wishList?.includes(product?._id) ? (
                        <FavoriteIcon
                          style={{
                            width: '50px',
                            height: '50px',
                            color: 'red',
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{
                            width: '50px',
                            height: '50px',
                            opacity: '0.7',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="mb-3">
                  <div className="d-flex align-items-center ">
                    <strong className=" fs-4">NGN</strong>
                    <strong className="fs-1">
                      {discountedPrice.toFixed(2)}
                    </strong>
                    <strong
                      className="mx-3"
                      style={{ textDecoration: 'line-through' }}
                    >
                      NGN{product?.price}
                    </strong>

                    <strong style={{ opacity: '0.6' }}>
                      {formattedDiscountPercentage}% off
                    </strong>
                  </div>
                  <div className="d-flex flex-column">
                    <strong style={{ color: 'red' }}> Extra 8% off</strong>
                    <Button
                      variant="light"
                      style={{ width: '250px' }}
                      className="d-flex flex-column mobileStyle"
                    >
                      <strong className="fs-5">NGN 1,750.06 off</strong>
                      <span>Store Coupon</span>
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} className="scrollbars buttonBg2 p-2">
              <div className="d-flex align-items-center mb-1 gap-3">
                <div>
                  <strong>Ship to :</strong>
                </div>
                <div>
                  <div className="d-flex align-items-center text-capitalize">
                    <LocationOnOutlinedIcon
                      style={{ width: '20px', height: '20px' }}
                    />
                    {shipping ? shipping.state : 'Nigeria'}
                  </div>
                </div>
              </div>
              <div className="">
                <strong>Free sheeping</strong>
                <p>Estimated delivery Sep 22</p>
              </div>
              <div className="mb-1">
                <strong>Services :</strong>
                <p>75-days buyer protection</p>
              </div>

              <ListGroup variant="flu" className="">
                <ListGroup.Item className="mb-3">
                  <strong>Quantity</strong>

                  {theProduct !== null ? (
                    <div>
                      {currentCartProductId?.map((item) => (
                        <div key={item._id}>
                          {item.quantity ? (
                            <div className=" d-flex align-items-center gap-1">
                              <Button
                                className="buttonBg2"
                                variant="light"
                                style={{
                                  padding: '5px',
                                  borderRadius: '50%',
                                  opacity: '0.7',
                                }}
                                onClick={() =>
                                  IncreaseQuantity(item, item.quantity - 1)
                                }
                              >
                                <RemoveOutlinedIcon />
                              </Button>

                              <strong>{item?.quantity}</strong>
                              <Button
                                className="buttonBg2"
                                variant="light"
                                style={{
                                  padding: '5px',
                                  borderRadius: '50%',
                                  opacity: '0.7',
                                }}
                                onClick={() =>
                                  IncreaseQuantity(item, item.quantity + 1)
                                }
                              >
                                <AddOutlinedIcon />
                              </Button>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center gap-1">
                      <Button
                        className="buttonBg2"
                        variant="light"
                        style={{
                          padding: '5px',
                          borderRadius: '50%',
                          opacity: '0.7',
                        }}
                      >
                        <RemoveOutlinedIcon />
                      </Button>

                      <strong>0</strong>
                      <Button
                        className="buttonBg2"
                        variant="light"
                        style={{
                          padding: '5px',
                          borderRadius: '50%',
                          opacity: '0.7',
                        }}
                        disabled={product?.countInStock === 0}
                        onClick={() => handleAddProduct(product._id)}
                      >
                        <AddOutlinedIcon />
                      </Button>
                    </div>
                  )}

                  <p className="my-3">
                    {product?.countInStock} Pieces available
                  </p>
                </ListGroup.Item>

                <Link
                  to="/products/shipping"
                  className="d-grid text-decoration-none mb-3"
                >
                  <Button
                    variant="danger"
                    className="bg-danger butonBgRed  fw-bold"
                    onClick={handleBuy}
                  >
                    Buy Now
                  </Button>
                </Link>
                <div className="d-grid">
                  <Button
                    disabled={product?.countInStock === product?.quantity}
                    onClick={() => handleAddProduct(product._id)}
                    variant="light"
                    className="  butonBgRed buttonvariant  fw-bold"
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroup>
            </Col>
          </Row>
          <Row className="bgNavSize2 my-5">
            <Col md={12} className="scrollbars">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-none d-md-flex align-items-center gap-5">
                    <p>Description</p>
                    <p>Specifications</p>
                    <p>Customer Reviews</p>
                    <p>You may also like</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <strong>Description :</strong>
                    <strong>Report item</strong>
                  </div>

                  <div className="">
                    <p>{product?.desc}</p>
                  </div>
                </ListGroup.Item>
                {product?.specifications &&
                product?.specifications?.length > 0 ? (
                  <ListGroup.Item>
                    <h3 className="my-4">Specifications</h3>
                    <div className="greyBorder p-1">
                      <div className="grid-container">
                        {product?.specifications?.map((specification) => (
                          <div className="grid-item" key={specification?._id}>
                            <ProductSpecification
                              specification={specification}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </ListGroup.Item>
                ) : (
                  ''
                )}

                <ListGroup.Item>
                  <h3 className="my-4">Customer Reviews (0)</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3 className="my-4">Buyers Questions & Answers (0)</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} className="scrollbars d-none  flex-column">
              {' '}
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="mb-3">
                      <div className="d-flex align-items-center ">
                        <strong className=" fs-4">NGN</strong>
                        <strong className="fs-1">
                          {discountedPrice.toFixed(2)}
                        </strong>
                      </div>
                      <strong
                        className="mx-3"
                        style={{ textDecoration: 'line-through' }}
                      >
                        NGN{product?.price}
                      </strong>

                      <strong style={{ opacity: '0.6' }}>
                        {formattedDiscountPercentage}% off
                      </strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="mb-3">
                      <Row>
                        <Col>
                          <strong>Ship to</strong>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center">
                            <LocationOnOutlinedIcon
                              style={{ width: '20px', height: '20px' }}
                            />
                            Abuja
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-3">
                      <strong>Free sheeping</strong>
                      <p>Estimated delivery Sep 22</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-3">
                      <strong>Services</strong>
                      <p>75-days buyer protection</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-3">
                      <strong>Quantity</strong>
                      <div className=" d-flex align-items-center gap-1">
                        <Button
                          className="buttonBg2"
                          variant="light"
                          style={{
                            padding: '5px',
                            borderRadius: '50%',
                            opacity: '0.7',
                          }}
                        >
                          <RemoveOutlinedIcon />
                        </Button>
                        <strong>1</strong>
                        <Button
                          className="buttonBg2"
                          variant="light"
                          style={{
                            padding: '5px',
                            borderRadius: '50%',
                            opacity: '0.7',
                          }}
                        >
                          <AddOutlinedIcon />
                        </Button>
                      </div>
                      <p className="my-3">
                        {product?.countInStock} Pieces available
                      </p>
                    </ListGroup.Item>

                    <div className="d-grid mb-3">
                      <Button
                        variant="danger"
                        className="bg-danger butonBgRed  fw-bold"
                      >
                        Buy Now
                      </Button>
                    </div>
                    <div className="d-grid">
                      <Button
                        variant="light"
                        className=" butonBgRed buttonvariant  fw-bold"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {userProduct && (
            <ListGroup
              variant="flush"
              style={{ margin: 'auto', width: '90vw' }}
            >
              {allUserProductId && allUserProductId?.length > 0 && (
                <div className="mb-3">
                  <h4>Recomended From {userPostUserName?.storeName} </h4>
                  <ListGroup.Item className="mb-3">
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{
                        200: 1,
                        270: 2,
                        300: 2,
                        545: 3,
                        700: 4,
                        900: 5,
                        1070: 6,
                        1280: 7,
                      }}
                    >
                      <Masonry gutter="10px">
                        {allUserProductId?.slice(0, 14).map((product) => (
                          <div key={product._id}>
                            {product && product?._id && (
                              <Link
                                to={`/products/${product?._id}`}
                                className="text-decoration-none text-black"
                              >
                                <HomeCard product={product} />
                              </Link>
                            )}
                          </div>
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  </ListGroup.Item>
                </div>
              )}

              {productLowDiscountprice &&
                productLowDiscountprice.length > 0 && (
                  <ListGroup.Item className="my-3">
                    <div className="">
                      <h4 className="mb-3">
                        Top Selling From {userPostUserName?.storeName}
                      </h4>
                      <Link
                        style={{ color: 'inherent' }}
                        className="text-decoration-none"
                      >
                        <FirstCard
                          own={true}
                          productLowDiscountprice={productLowDiscountprice}
                        />
                      </Link>
                    </div>
                  </ListGroup.Item>
                )}
            </ListGroup>
          )}
        </div>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Product;
