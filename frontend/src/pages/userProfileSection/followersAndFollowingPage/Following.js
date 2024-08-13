import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { useSelector } from 'react-redux';
import HomeCard from '../../../components/HomeCard';

import { Link } from 'react-router-dom';

function Following() {
  const { userInfo } = useSelector((state) => state.user);
  const [followingProduct, setFollowingProduct] = useState([]);

  const [followingSection, setFollowingSection] = useState("onsale" || {});

  useEffect(() => {
    const fetchUserFollowingProducts = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/products/${userInfo._id}/following`,

          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setFollowingProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollowingProducts();
  }, [userInfo._id, userInfo]);

  const eachFollowingProductAndUser = followingProduct?.map((product) => {
    const products = product?.product?.map((item) => item);
    const productUser = product.user;

    return {
      product: products,
      user: productUser,
    };
  });

  const filterOnSaleProducts = (products) => {
    return products.filter((product) => product.countInstock > 0);
  };

  const filterTopSellingProducts = (products) => {
    return products.filter((product) => product.successfulPay > 1);
  };

  const filterNewArrivalProducts = (products) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= sevenDaysAgo && productDate <= currentDate;
    });
  };

  const productBySection = (sectionKey, userProducts) => {
    if (!Array.isArray(userProducts)) {
      return [];
    }
    switch (sectionKey) {
      case 'newarrival':
        return userProducts
          .filter((product) => {
            const createdAt = new Date(product.createdAt);
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 22);
            return createdAt >= currentDate;
          })
          .slice(0, 4)
          .map((product) => (
            <Link
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={`/products/${product._id}`}
            >
              <HomeCard product={product} key={product._id} />
            </Link>
          ));
      case 'onsale':
        return userProducts
          .filter((product) => product.countInStock > 0)
          .map((product) => (
            <Link
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={`/products/${product._id}`}
            >
              <HomeCard product={product} key={product._id} />
            </Link>
          ));
      case 'topselling':
        return userProducts
          .filter((product) => product.succcessfulPaid > 1)
          .slice(0, 4)
          .map((product) => (
            <Link 
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={`/products/${product._id}`}
            >
              <HomeCard product={product} key={product._id} />
            </Link>
          ));
      default:
        return userProducts?.map((product) => (
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to={`/products/${product._id}`}
          >
            <HomeCard product={product} key={product._id} />
          </Link>
        ));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div>
        <h4>All My Fovorite Stores</h4>
      </div>
      {followingProduct.length > 0 ? (
        <div>
          {eachFollowingProductAndUser?.map((item) => (
            <div style={{ width: '100%' }}>
              <div
                key={item._id}
                className="d-md-flex d-none flex-wrap p-3 colBG mb-3"
              >
                <div style={{ width: '30%', borderRight: '1px solid grey' }}>
                  <strong style={{ fontSize: '13px' }} className="mb-4">
                    {item?.user?.storeName}{' '}
                  </strong>
                  <Link
                    style={{ color: 'inherit' }}
                    className="text-decoration-none"
                    to={`/seller/${item?.user?._id}`}
                  >
                    <Button
                      variant="light"
                      style={{ border: '1px solid black' }}
                    >
                      Visit store
                    </Button>
                  </Link>
                </div>
                <div
                  className="p-2"
                  style={{
                    width: '70%',
                    margin: 'auto',
                  }}
                >
                  <div
                    className="mb-2 d-flex gap-2 justify-content-between"
                    style={{ fontSize: '10px', borderBottom: '2px solid grey' }}
                  >
                    <Button
                      className={
                        followingSection[item?.user?._id] === 'newarrival '
                          ? 'followingButtonBg '
                          : ''
                      }
                      onClick={() =>
                        setFollowingSection({
                          ...followingSection,
                          [item?.user._id]: 'newarrival',
                        })
                      }
                      variant="light"
                      style={{ fontSize: '' }}
                    >
                      New Arrivals (
                      {
                        productBySection(
                          ([item.user._id], 'newarrival'),
                          eachFollowingProductAndUser
                        ).length
                      }
                      )
                    </Button>
                    <Button
                      className={
                        followingSection[item?.user?._id] === 'onsale'
                          ? 'followingButtonBg'
                          : ''
                      }
                      onClick={() =>
                        setFollowingSection({
                          ...followingSection,
                          [item?.user?._id]: 'onsale',
                        })
                      }
                      variant="light"
                    >
                      On Sale(
                      {
                        productBySection(
                          item.user?._id,
                          'onsale',
                          eachFollowingProductAndUser
                        ).length
                      }
                      )
                    </Button>
                    <Button
                      className={
                        followingSection[item.user._id] === 'topselling'
                          ? 'followingButtonBg'
                          : ''
                      }
                      onClick={() =>
                        setFollowingSection({
                          ...followingSection,
                          [item.user._id]: 'topselling',
                        })
                      }
                      variant="light"
                    >
                      Top Selling (
                      {
                        productBySection(
                          ([item.user._id], 'topselling'),
                          eachFollowingProductAndUser
                        ).length
                      }
                      )
                    </Button>
                  </div>

                  <div>
                    <div className="d-flex align-items-center flex-wrap">
                      {productBySection(
                        followingSection[item.user._id] || 'newarrival',
                        item.product
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-center d-md-none flex-wrap mb-3 colBG">
                <div className="p-2  d-flex flex-column">
                  <strong className="mb-2 text-capitalize">
                    {item?.user?.storeName}{' '}
                  </strong>
                  <Link to={`/seller/${item?.user?._id}`}>
                    <Button
                      variant="light"
                      style={{ border: '1px solid black' }}
                    >
                      Visit store
                    </Button>
                  </Link>
                </div>

                <div
                  className="mt-3 d-flex gap-2 align-items-center justify-content-between"
                  style={{ fontSize: '10px', borderBottom: '2px solid grey' }}
                >
                  <Button
                    className={
                      followingSection[item?.user?._id] === 'newarrival'
                        ? 'followingButtonBg text-white'
                        : ''
                    }
                    onClick={() =>
                      setFollowingSection({
                        ...followingSection,
                        [item?.user._id]: 'newarrival',
                      })
                    }
                    variant="light"
                  >
                    New Arrivals (
                    {filterNewArrivalProducts(item.product).length})
                  </Button>
                  <Button
                    className={
                      followingSection[item?.user?._id] === 'onsale'
                        ? 'followingButtonBg text-white'
                        : ''
                    }
                    onClick={() =>
                      setFollowingSection({
                        ...followingSection,
                        [item?.user?._id]: 'onsale',
                      })
                    }
                    variant="light"
                  >
                    On Sale ({filterOnSaleProducts(item.product).length})
                  </Button>
                  <Button
                    className={
                      followingSection[item.user._id] === 'topselling'
                        ? 'followingButtonBg text-white'
                        : ''
                    }
                    onClick={() =>
                      setFollowingSection({
                        ...followingSection,
                        [item.user._id]: 'topselling',
                      })
                    }
                    variant="light"
                  >
                    Top Selling (
                    {filterTopSellingProducts(item?.product).length})
                  </Button>
                </div>
                <div>
                  <div
                    className="d-flex mt-3 justify-content-center align-items-center flex-wrap"
                    style={{ width: '100%' }}
                  >
                    {productBySection(
                      followingSection[item.user._id] || 'newarrival',
                      item.product
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <Form>
              <FormGroup style={{ width: '400px' }}>
                <Form.Control type="text" placeholder="Search store name" />
              </FormGroup>
            </Form>
            <Button
              variant="lighter"
              className="fw-bold text-white"
              style={{ backgroundColor: 'grey' }}
            >
              search
            </Button>
          </div>
          <div className="colBG">
            <p className="p-4" style={{ borderBottom: '1px solid grey' }}>
              You currently don’t have any stores saved in your favorite list.
              Start browsing stores now, go to Homepage
            </p>
            <div>
              <p className="fw-bold p-4">
                How do i add a store to my Favorite Stores list
              </p>
              <div className="d-flex p-2 align-items-center justify-content-between  flex-wrap">
                <div
                  className="mb-3"
                  style={{ width: '400px', border: '1px solid grey' }}
                >
                  <img
                    style={{ width: '100%', minHeight: '200px' }}
                    src="/images/third.png"
                    alt=""
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ width: '400px', border: '1px solid grey' }}
                >
                  <img
                    style={{ width: '100%', minHeight: '200px' }}
                    src="/images/firsrt.png"
                    alt=""
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ width: '400px', border: '1px solid grey' }}
                >
                  {' '}
                  <img
                    style={{ width: '100%', minHeight: '200px' }}
                    src="/images/fourth.png"
                    alt=""
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ width: '400px', border: '1px solid grey' }}
                >
                  {' '}
                  <img
                    style={{ width: '100%', minHeight: '200px' }}
                    src="/images/second.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Following;
