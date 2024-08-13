import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MobileCard from '../../components/MobileCard';
import Button from 'react-bootstrap/esm/Button';
import NaviBar from '../../navSection/NaviBar';
import LoadingBox from '../../utils/LoadingBox';
import HomeCard from '../../components/HomeCard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetchstart':
      return { ...state, loading: true };
    case 'fetchsuccess':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        countProducts: action.payload.countProducts,
        pages: action.payload.pages,
        loading: false,
      };
    case 'fetcherror':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: 'N1 to N50',
    value: '1-50',
  },
  {
    name: 'N51 to N200',
    value: '51-200',
  },
  {
    name: 'N201 to N1000',
    value: '201-1000',
  },
  {
    name: 'N500 to N5000',
    value: '500-5000',
  },
];

function SearchScreen() {
  const [{ loading, products, error, countProducts, pages }, dispatch] =
    useReducer(reducer, {
      loading: false,
      error: false,
    });
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const brand = sp.get('brand') || 'all';
  const query = sp.get('query') || 'all';
  const page = sp.get('page') || 1;
  const price = sp.get('price') || 'all';
  const order = sp.get('order') || 'newest';

  useEffect(() => {
    const handleSearch = async () => {
      try {
        dispatch({ type: 'fetchstart' });

        const { data } = await axios.get(
          `${apiUrl}/api/products/search?query=${query}&page=${page}&brand=${brand}&price=${price}&order=${order}`
        );
        dispatch({ type: 'fetchsuccess', payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'fetcherror', payload: error });
      }
    };
    handleSearch();
  }, [query, order, brand, page, price]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/categories`);
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const filterProducts = (filter) => {
    const filterQuery = filter.query || query;
    const filterbrand = filter.brand || brand;
    const filterPage = filter.page || page;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?query=${filterQuery}&page=${filterPage}&price=${filterPrice}&order=${sortOrder}&brand=${filterbrand}`;
  };

  
  return (
    <div>
      <NaviBar query={query} setQuery={query}/>
      <Row className="p-3">
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={'all' === brand ? 'fw-bold' : ''}
                  to={filterProducts({ brand: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === brand ? 'fw-bold' : ''}
                    to={filterProducts({ brand: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'fw-bold' : ''}
                  to={filterProducts({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={filterProducts({ price: p.value })}
                    className={p.value === price ? 'fw-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'NO' : countProducts} Results
                    {brand !== 'all' && ':' + brand}
                    {price !== 'all' && ':' + price}
                    {query !== 'all' || brand !== 'all' || price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      ></Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(filterProducts({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrival</option>
                    <option value="lowest">Price: Low to High </option>
                    <option value="highest">Price: Hight to Low</option>
                  </select>
                </Col>
              </Row>
            </>
          )}
          {products?.length === 0 && <h2>No Products Found</h2>}
          <Row>
            {products?.map((product) => (
              <Col sm={6} lg={3} className="mb-3" key={product._id}>
                <Link
                  style={{ color: 'inherit' }}
                  className="text-decoration-none"
                  to={`/products/${product._id}`}
                >
                  <HomeCard product={product} />
                </Link>
              </Col>
            ))}
          </Row>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x - 1}
                className="mx-1"
                to={filterProducts({ page: x + 1 })}
              >
                <Button className={Number(page) === x + 1 ? 'fw-bold' : ''}>
                  {x + 1}
                </Button>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SearchScreen;
