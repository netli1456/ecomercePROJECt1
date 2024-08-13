import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingBox from '../../utils/LoadingBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductHeader from '../singleProductPage/ProductHeader';
import { Link, useParams } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './profile.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';

import NaviBar from '../../navSection/NaviBar';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ProductUpdate from '../../components/ProductUpdate';
import Footer from '../footerPage/Footer';

function UserSellerStore() {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [deleteButton, setDeleteButton] = useState(false);
  const [update, setUpdate] = useState(false);

  const params = useParams();
  const { userId } = params;
  const [uploadOpen, setUploadOpen] = useState(false);

  const handleUploadOpen = () => {
    setUploadOpen(!uploadOpen);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${apiUrl}/api/products/userproducts/${userId}`
        );
        setUserPost(data);

        setLoading(false);
      } catch (error) {
        toast.error('error productuser', {
          toastId: 'unique-toast-id',
          autoClose: 500,
        });
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, userInfo]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${apiUrl}/api/products/${userId}/categories`
        );
        setCategories(data);

        setLoading(false);
      } catch (error) {
        toast.error('error categories', {
          toastId: 'unique-toast-id',
          autoClose: 2000,
        });
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); 

  const allPosts = userPost.product?.map((products) => {
    const originalPrice = products.price;
    const discountDecimal = products.discount;
    const discountPercentage = discountDecimal / 100;
    const discountedPrice =
      originalPrice - (originalPrice * discountPercentage).toFixed(2);
    const percentageRound = (discountPercentage * 100).toFixed(0);

    return {
      ...products,
      discountedPrice,
      percentageRound,
    };
  });

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${apiUrl}/api/products/${productId}/delete`,

        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setDeleteButton(false);

      toast.success('item deleted successfully', {
        toastId: 'unique-toast-Id',
        autoClose: 4000,
      });
      window.location.reload();
    } catch (error) {
      toast.error('error deleting item', {
        toastId: 'unique-toast-Id',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (update || uploadOpen) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';

      window.scrollTo(0, 0);
      document.body.style.height = '80vh';
      document.body.style.overflowY = 'hidden';
      
      return () => {
        window.history.scrollRestoration = scrollRestoration;
      };
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.overflowY = 'auto';

    }
  }, [update, uploadOpen]);

  useEffect(() => {
    if (update ) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';

      window.scrollTo(0, 0);

      return () => {
        window.history.scrollRestoration = scrollRestoration;
      };
    }
  }, [update]);

  useEffect(() => {
    const scrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = scrollRestoration;
    };
  }, []);


  return (
    <div
      style={{ width: '100vw' }}
      className={'scrollbars colBG storeOverflow'}
    >
      {loading ? (
        <div
          style={{ height: '80vh' }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <LoadingBox />
        </div>
      ) : (
        <>
          <ProductHeader
            handleUploadOpen={handleUploadOpen}
            uploadOpen={uploadOpen}
            product={userId}
            own={true}
          />

          <div style={{ width: '95vw', margin: 'auto' }}>
            <div
              style={{ width: '100%', height: '50px' }}
              className="d-none d-md-flex gap-3 align-items-center"
            >
              <span>Products</span>
              <span>Account</span>
            </div>
            <Row>
              <Col
                md={2}
                className="d-none d-md-flex "
                style={{ minHeight: '50vh' }}
              >
                <div className="colBG p-3 cardBorderLight">
                  <div className="d-flex flex-column ">
                    <strong className=""> Store Categories</strong>
                    {allPosts?.length === 0 ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '30vh', opacity: '0.5' }}
                      >
                        <h6>No Categories</h6>
                      </div>
                    ) : (
                      <>
                        {categories?.slice(0, 15).map((category, index) => (
                          <span
                            className="d-flex align-items-center gap-2"
                            key={index}
                          >
                            <LocalHospitalIcon style={{ opacity: '0.1' }} />
                            <Link
                              style={{
                                fontSize: '14px',
                                textDecoration: 'none',
                                color: 'black',
                              }}
                              className="categoryHover"
                            >
                              {category}
                            </Link>
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={10}>
                <div className="colBG p-3">
                  {allPosts?.length === 0 ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '30vh', opacity: '0.3' }}
                    >
                      <h2> Add Products To See Your Products</h2>
                    </div>
                  ) : (
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{
                        200: 1,
                        270: 2,
                        300: 2,
                        545: 3,
                        700: 3,
                        900: 3,
                        1070: 4,
                        1280: 4,
                      }}
                    >
                      <Masonry gutter="10px">
                        {allPosts?.map((product) => (
                          <div
                            key={product?._id}
                            style={{ maxHeight: '360px', minHeight: '360px' }}
                            className="parentcontainer"
                          >
                            <Link
                              to={`/products/${product?._id}`}
                              className={
                                'text-decoration-none text-dark parentcontainer'
                              }
                              style={{ maxHeight: '360px', minHeight: '360px' }}
                            >
                              {' '}
                              <div
                                style={{ position: 'relative' }}
                                className="p-2"
                              >
                                <div
                                  style={{
                                    height: '220px',

                                    borderRadius: '5px',
                                  }}
                                  className="cardBorderLight"
                                >
                                  <img
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                    src={product?.imgUrl}
                                    alt=""
                                  />

                                  <div
                                    className=""
                                    style={{
                                      position: 'absolute',
                                      top: -10,
                                      right: -20,
                                    }}
                                  >
                                    {' '}
                                    <div style={{ position: 'relative' }}>
                                      <ShieldIcon
                                        style={{
                                          width: '70',
                                          height: '70px',
                                          color: 'orange',
                                        }}
                                      />
                                      <div
                                        className="d-flex align-items-center gap-1"
                                        style={{
                                          position: 'absolute',
                                          top: 15,
                                          right: 15,
                                          color: 'white',
                                        }}
                                      >
                                        <strong style={{ fontSize: '16px' }}>
                                          {product.percentageRound}
                                        </strong>
                                        <span
                                          className="d-flex flex-column"
                                          style={{}}
                                        >
                                          <span style={{ fontSize: '11px' }}>
                                            %
                                          </span>
                                          <span style={{ fontSize: '11px' }}>
                                            OFF
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex flex-column align text-decoration-none">
                                  {product?.desc.length >= 66 ? (
                                    <span style={{ fontSize: '13px' }}>
                                      {product.desc.slice(0, 66)}...
                                    </span>
                                  ) : (
                                    <span
                                      className="text-capitalize"
                                      style={{ fontSize: '14px' }}
                                    >
                                      {product?.desc}
                                    </span>
                                  )}

                                  <strong
                                    style={{ color: 'orange', opacity: '0.9' }}
                                  >
                                    NGN{product.discountedPrice.toFixed(2)}
                                  </strong>
                                  <strong
                                    style={{
                                      fontSize: '12px',
                                      textDecoration: 'line-through',
                                      opacity: '0.6',
                                    }}
                                  >
                                    NGN{product.price.toFixed(2)}
                                  </strong>
                                  <span style={{ fontSize: '13px' }}>
                                    In stock({product?.countInStock})
                                  </span>
                                </div>
                                {(userInfo?._id === params.id ||
                                  userInfo?.isAdmin) && (
                                  <Link
                                    onClick={() => setDeleteButton(product._id)}
                                    className="moreIcon px-1"
                                    style={{ position: 'absolute', top: 10 }}
                                  >
                                    <MoreVertIcon />
                                  </Link>
                                )}
                                {deleteButton === product._id && (
                                  <div
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      transition: '0.7s',
                                      width: '100%',
                                      height: '63%',
                                    }}
                                    className="d-flex justify-content-center productDelete"
                                  >
                                    <div
                                      className="d-flex gap-1  flex-column "
                                      style={{
                                        transition: '0.7s',
                                        width: '70%',
                                        margin: 'auto',
                                      }}
                                    >
                                      <Link
                                        onClick={() => setUpdate(product._id)}
                                      >
                                        <Button
                                          style={{ width: '100%' }}
                                          variant="lighter"
                                          className="fw-bold edit"
                                        >
                                          Edit
                                        </Button>
                                      </Link>
                                      <Button
                                        variant="lighter"
                                        className="fw-bold suspend"
                                      >
                                        Suspend
                                      </Button>
                                      <Link
                                        className="text-decoration-none text-white"
                                        onClick={() =>
                                          handleDelete(product._id)
                                        }
                                      >
                                        <Button
                                          style={{ width: '100%' }}
                                          variant="lighter"
                                          className=" delete fw-bold"
                                        >
                                          Delete
                                        </Button>
                                      </Link>
                                    </div>
                                    <Link
                                      onClick={() =>
                                        setDeleteButton(!deleteButton)
                                      }
                                      className="moreIcon  px-1"
                                      style={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 0,
                                      }}
                                    >
                                      <MoreVertIcon />
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </Link>
                            {update === product._id && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100vw',
                                  height: '100vh',
                                  zIndex: '999999',
                                }}
                                className="productUpdateBG d-flex align-items-center justify-content-center"
                              >
                                <ProductUpdate
                                  update={update}
                                  setUpdate={setUpdate}
                                  product={product}
                                  setDeleteButton={setDeleteButton}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default UserSellerStore;
