import React, { useEffect, useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { apiUrl } from '../utils/ApiConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Part1 from '../gridSection/Part1';
import Part2 from '../gridSection/Part2';
import Navigation from '../pages/mobileSection/Navigation';
import FirstCard from '../pages/mobileSection/FirstCard';
import SecondCard from '../pages/mobileSection/SecondCard';
import ThirdSection from '../pages/mobileSection/ThirdSection';
import FourthCard from '../pages/mobileSection/FourthCard';
import Part3 from '../gridSection/Part3';
import Part4 from '../gridSection/Part4';
import HomeCard from './HomeCard';
import Button from 'react-bootstrap/esm/Button';
import LoadingBox from '../utils/LoadingBox';
import { toast } from 'react-toastify';
import MobileCard from './MobileCard';
import BottomHeader from '../pages/userProfileSection/profileHeader/BottomHeader';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeGrid() {
  const [{ loading, products }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    products: [],
  });

  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [newRandom, setNewRandom] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    try {
      const fetchCategorybyName = async () => {
        const { data } = await axios.get(`${apiUrl}/api/products/categories`);
        setCategories(data);
      };
      fetchCategorybyName();
    } catch (error) {
      toast.error('error ', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchDiscountPrice = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const res = await axios.get(`${apiUrl}/api/products/random`);

        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error('error ', { toastId: 'unique-toast-id', autoClose: 500 });
        console.log(error);
      }
    };
    fetchDiscountPrice();
  }, []);

  useEffect(() => {
    try {
      const fetchAllProd = async () => {
        const { data } = await axios.get(`${apiUrl}/api/products/allproducts`);
        setAllproducts(data);
      };
      fetchAllProd();
    } catch (error) {
      toast.error('error fetching all products', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
      console.log(error);
    }
  }, []);

  const productLowDiscountprice = products.lowdiscount?.map((product) => {
    const originalPrice = product.price;
    const discountPercentage = product.discount;
    const discountDecimal = discountPercentage / 100;
    const discountedPrice = (
      originalPrice -
      originalPrice * discountDecimal
    ).toFixed(0);

    return {
      ...product,
      discountedPrice,
    };
  });

  const productHighDiscountprice = products.highdiscount?.map((product) => {
    const originalPrice = product.price;
    const discountPercentage = product.discount;
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
  const productLowprice = products.lowprice?.map((product) => {
    const originalPrice = product.price;
    const discountPercentage = product.discount;
    const discountDecimal = discountPercentage / 100;
    const discountedPrice = originalPrice - originalPrice * discountDecimal;

    return {
      ...product,
      discountedPrice,
    };
  });
  const productHighprice = products.highprice?.map((product) => {
    const originalPrice = product.price;
    const discountPercentage = product.discount;
    const discountDecimal = discountPercentage / 100;
    const discountedPrice = originalPrice - originalPrice * discountDecimal;

    return {
      ...product,
      discountedPrice,
    };
  });

  useEffect(() => {
    if (
      productLowDiscountprice &&
      productHighDiscountprice &&
      productLowprice &&
      productHighprice
    ) {
      const includedProductIds = [
        ...productLowDiscountprice.map((product) => product._id),
        ...productHighDiscountprice.map((product) => product._id),
        ...productLowprice.map((product) => product._id),
        ...productHighprice.map((product) => product._id),
      ];

      const filteredOutProducts = allproducts.filter(
        (product) => !includedProductIds.includes(product._id)
      );
      if (JSON.stringify(filteredOutProducts) !== JSON.stringify(newRandom)) {
        setNewRandom(filteredOutProducts);
      }
    }
  }, [
    newRandom,
    allproducts,
    productLowDiscountprice,
    productHighDiscountprice,
    productLowprice,
    productHighprice,
  ]);

  useEffect(() => {
    if (loading === true) {
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      document.body.style.height = '100vh';

      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height = 'auto';
      };
    }
  }, [loading]);

  const allFilteredProducts = (sectionKey, userProducts) => {
    if (sectionKey === null) {
      return userProducts;
    }
    switch (sectionKey.toLowerCase()) {
      case 'phones':
        return filterByKeywords(userProducts, ['phones', 'gadgets', "phone", 'phone case', 'charger', 'iphone', 'samsung', 'techno']);
      case 'computer':
        return filterByKeywords(userProducts, [
          'laptops',
          'computer',
          'pc',
          'windows',
          'macbook',
          'tablet',
          'mac',
        ]);
      case 'car':
        return filterByKeywords(userProducts, [
          'car',
          'cars',
          'vehicle',
          'truck', 'motorcycle'
        ]);
      case 'lowprice':
        return userProducts.filter((product) => product.price < 500); // Define your price threshold here
      case 'sports':
        return filterByKeywords(userProducts, [
          'sports',
          'sport',
          'football',
          'tennis',
          'golf',
          'soccer',
          'basketball',
        ]);
      case 'homeandgarden':
        return filterByKeywords(userProducts, ['home', 'flower', 'flowers', 'rose', 'roses']);
      case 'toys':
        return filterByKeywords(userProducts, ['toys', 'toy']);
      case 'parts':
        return filterByKeywords(userProducts, ['car parts', 'vehicle parts', 'engine']);
      default:
        return null;
    }
  };

  const filterByKeywords = (userProducts, keywords) => {
    return userProducts.filter((product) => {
      console.log('Product:', product);
      if (product.brand && product.name && product.desc) {
        const productLowerCased =
          product.brand.toLowerCase() +
          product.name.toLowerCase() +
          product.desc.toLowerCase();
        return keywords.some((keyword) => productLowerCased.includes(keyword));
      }
      return false;
    });
  };

  const handleFiteredPage = (section) => {
    setFilter(section);
  };

  return (
    <div className="pb-5  ">
      {loading ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingBox></LoadingBox>
        </div>
      ) : (
        <div style={{ margin: '', width:"100%"}}>
          {/* MOBILE NAV */}
          <div className="d-md-none d-sm-block px-2 smallNavBG" style={{ paddingTop: '4rem', width:"100%" }}>
            <Navigation
              filter={filter}
              setFilter={setFilter}
              handleFiteredPage={handleFiteredPage}
            />
          </div>
          {filter === 'phones' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Phones category
              </strong>
              <h6>
                ({allFilteredProducts('phones', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}
          {filter === 'computer' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid', }}
              >
                {' '}
                office & computer
              </strong>
              <h6>
                ({allFilteredProducts('computer', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}
          {filter === 'lowprice' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Low price items
              </strong>
              <h6>
                ({allFilteredProducts('lowprice', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}
          {filter === 'sports' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Sports 
              </strong>
              <h6>
                ({allFilteredProducts('sports', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}

          {filter === 'toys' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Toys and hobbies
              </strong>
              <h6>
                ({allFilteredProducts('toys', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}
          {filter === 'parts' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Automobile Parts
              </strong>
              <h6>
                ({allFilteredProducts('parts', allproducts)?.length}) items
                available
              </h6>
            </div>
          )}
          {filter === 'homeandgarden' && (
            <div className="mt-4 mb-3 colBG p-1 d-flex align-items-center justify-content-between">
              <strong className='fw-bold text-uppercase'
                style={{ borderBottom: '1px grey solid',  }}
              >
                {' '}
                Home & garden
              </strong>
              <h6>
                ({allFilteredProducts('homeandgarden', allproducts)?.length})
                items available
              </h6>
            </div>
          )}
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
            className="mb-5"
          >
            {filter && (
              <Masonry gutter="10px">
                {allFilteredProducts(filter, allproducts)?.map((product) => (
                  <Link
                    className="text-decoration-none text-black"
                    to={`/products/${product._id}`}
                    key={product._id}
                  >
                    <HomeCard product={product} />
                  </Link>
                ))}
              </Masonry>
            )}
          </ResponsiveMasonry>
          <div className='d-none'>
          <BottomHeader filter={filter}/>
          </div>
          {filter === null && (
            <div>
              {/* FIRST GRID SECTION */}
              <Row className="d-none d-md-flex">
                <Col md={3} className="d-none d-md-block">
                  <Part1 categories={categories} />
                </Col>
                <Col
                  md={9}
                  style={{ height: '79vh' }}
                  className="d-none d-md-block"
                >
                  <Part2
                    productHighprice={productHighprice}
                    productLowDiscountprice={productLowDiscountprice}
                  />
                </Col>
              </Row>

              {/* SECOND TWO CARDS */}

              <Row className="my-4 d-none d-md-flex">
                <Col md={5}>
                  <Part3 productHighDiscountprice={productHighDiscountprice} />
                </Col>
                <Col md={7}>
                  <Part4 productLowprice={productLowprice} />
                </Col>
              </Row>

              {/* MOBILE SECTION */}

              <div>
                <div className="d-md-none d-sm-block">
                  {/* MOBILE CARDS */}
                  <FirstCard
                    productLowDiscountprice={productLowDiscountprice}
                  />
                </div>

                <div className="d-md-none d-sm-block">
                  {/* MOBILE CARD */}
                  <SecondCard productHighprice={productHighprice} />
                </div>

                <div className="d-md-none d-sm-block">
                  {/* MOBILE CARD */}

                  <ThirdSection
                    productHighDiscountprice={productHighDiscountprice}
                  />
                </div>

                <div className="d-md-none d-flex flex-column  ">
                  {/* MOBILE CARD */}

                  <FourthCard productLowprice={productLowprice} />
                </div>
              </div>

              <div>
                <div className=" align-items-center justify-content-center gap-3 my-2 d-none d-md-flex">
                  <p
                    style={{
                      width: '100px',
                      borderTop: '2px solid black',
                      opacity: '0.5',
                    }}
                  ></p>
                  <h3 className="">More to love </h3>
                  <p
                    style={{
                      width: '100px',
                      borderTop: '2px solid black',
                      opacity: '0.5',
                    }}
                  ></p>
                </div>
                <div className="my-3 d-md-none">
                  <h3>More to love</h3>
                  <Button
                    variant="lighter"
                    style={{
                      // backgroundColor: 'rgb(213, 207, 207)',
                      color: 'black',
                    }}
                    className='mobileStyle'
                  >
                    Selected items
                  </Button>
                </div>
              </div>

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
                  {newRandom.length > 0 ? (
                    newRandom?.map((product) => (
                      <Link
                        style={{}}
                        className="text-decoration-none text-black"
                        to={`products/${product?._id}`}
                        key={product?._id}
                      >
                        {' '}
                        <HomeCard product={product} />
                      </Link>
                    ))
                  ) : (
                    <div>No Products</div>
                  )}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomeGrid;
