import React from 'react';
import Button from 'react-bootstrap/Button';
import GppGoodIcon from '@mui/icons-material/GppGood';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Cards from '../components/Cards';
import { Link, useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

function Part2(props) {
  const { productLowDiscountprice, productHighprice } = props;
  const navigate = useNavigate();
  return (
    <div>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <h6>
                <GppGoodIcon className="iconColor" /> Safe & Reliable Payment
              </h6>
            </span>
            <span>
              <h6>
                <MonetizationOnIcon className="iconColor" /> Money Back
                Guarantee
              </h6>
            </span>
            <span>
              <h6>
                <SupportAgentIcon className="iconColor" /> 24/7 Customer Service
              </h6>
            </span>
          </div>
        </Card.Body>
      </Card>
      <Row className="my-2 ">
        <Col md={4} style={{ height: '68vh' }} className="d-none d-md-block">
          <Card
            style={{
              height: '98%', overflowY:"scroll"
            }}
            className="cards-container d-none d-md-block scrollbars"
          >
            <Card.Body
              className=""
              
            >
              <div
              >
                
                <div>
                <strong>Your fave shopping guide</strong>
                <p style={{ fontSize: '12px', opacity: '0.7' }}>
                  Check out the latest new deals
                </p>
              </div>
              <Card
                className="p-1 scrollbars"
                style={{
                  height: '80%',
                  width: '100%',
                  overflowY:"scroll",
                }}
              >
                <Card.Body>
                  <div>
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{
                        200: 1,
                        270: 1,
                        300: 1,
                        545: 1,
                        700: 1,
                        900: 1,
                        1070: 1,
                        1280: 2,
                      }}
                    >
                      <Masonry gutter="10px">
                        { productLowDiscountprice?.length > 0 ? productLowDiscountprice?.map((product) => (
                          <Link
                            to={`products/${product._id}`}
                            key={product._id}
                            className=" text-decoration-none"
                            style={{ width: '100%' }}
                          >
                            <Cards product={product} />
                            <strong
                              className=""
                              style={{ color: 'rgb(100, 166, 30)' }}
                            >
                              N{product.discountedPrice}
                            </strong>
                          </Link>
                        )): <div>No Products</div>}
                      </Masonry>
                    </ResponsiveMasonry>
                  </div>
                </Card.Body>
              </Card>
                
              </div>
              
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row className="mb-2 ">
            <Col md={7}>
              {' '}
              <Card style={{ height: '150px' }}>
                <img
                  src="https://us-cdn.sd-assets.com/media/images/dm/lps/2023/46778/assets/images/fall/desktop_hero_1.jpg"
                  alt=""
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Card>
            </Col>
            <Col md={5}>
              <Card style={{ height: '150px', width: '100%' }}>
                <strong className="text-center pt-2 d-none d-lg-flex aline-item" style={{fontSize:"12px"}}>
                  Welcome to Aloservices
                </strong>
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <Button
                    variant="lighter"
                    className=" join fw-bold "
                    style={{ borderRadius: '40px', width: '45%' }}
                  >
                    Join
                  </Button>
                  <Button
                    variant="lighter"
                    className=" join1 fw-bold "
                    style={{ borderRadius: '40px', width: '47%' }}
                    onClick={() => navigate('/login')}
                  >
                    SignIn
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="d-none  d-md-block mt-1">
              <Card style={{ height: '43vh' }}>
                <Card.Body className="d-flex flex-column  justify-content-center">
                  <div className="text-start">
                    <h5>
                      <strong>
                        Super<span className="danger">Deals</span>
                      </strong>
                    </h5>
                    <p className="topProduct">Top Products Incredible Prices</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    {productHighprice?.map((p) => (
                      <Link
                        to={`products/${p._id}`}
                        key={p._id}
                        style={{ minWidth: '32%' }}
                        className="text-decoration-none"
                      >
                        <div>
                          <div>
                            <Cards product={p} />
                          </div>
                        </div>
                        <strong
                          className=" "
                          style={{
                            color: 'rgb(100, 166, 30)',
                            zIndex: 1,
                          }}
                        >
                          N{p?.discountedPrice.toFixed(2)}
                        </strong>
                        <p className="topProducts mt-1">{}</p>
                      </Link>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Part2;
