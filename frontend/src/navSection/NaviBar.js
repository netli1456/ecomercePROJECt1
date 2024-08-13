import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Upload from '../components/Upload';
import { logOut } from '../redux/userSection/userSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { paymentReset } from '../redux/paymentSection/paymentSlice';
import { userProductReset } from '../redux/userSection/singleProductSlice';
import { productReset } from '../redux/userSection/userProducts';
import { shippingReset } from '../redux/shippingSection/shippinSlice';

import { toast } from 'react-toastify';

import axios from 'axios';
import { apiUrl } from '../utils/ApiConfig';
import Category from '../components/Category';
import SearchBar from '../pages/searchPage/SearchBar';
import Button from 'react-bootstrap/esm/Button';
import Test from '../components/Test';
import { cartReset } from '../redux/productSection/cartSlice';

function NaviBar(props) {
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const {
    open,
    setOpen,
    random,
    setRandom,
    smallNav,
    setOpenSections,
    openSection,
    query,
    setQuery,
    setIsClicked,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const LogoutHandler = () => {
    dispatch(logOut());
    dispatch(paymentReset());
    dispatch(userProductReset());
    dispatch(productReset());
    dispatch(shippingReset());
    dispatch(cartReset());
    localStorage.removeItem('openSection');

    toast.success('Signed Out', {
      toastId: 'unique-toast-id',
      autoClose: 3000,
    });
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/products/categories`);
      setCategories(data);
      setCatOpen(!catOpen);
    } catch (error) {
      toast.error('error', { toastId: 'unique-toast-id' });
    }
  };

  try {
  } catch (error) {
    toast.error('error ', {
      toastId: 'unique-toast-id',
      autoClose: 500,
    });
  }

  const handleCategoryMenu = () => {
    setCatOpen(!catOpen);
  };
  const handleCloseOpen = (section) => {
    setIsOpen(!isOpen);
    setOpenSections(section);
  };

  const handleSet = () => {
    toast.warn('sign in to go to this page', { toastId: 'unique-toast-id' });
  };

  // const [query, setQuery] = useState('');

  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if(query){
  //       navigate(`/test/?query=${query}` );
  //       console.log('query submited')
  //   }else {
  //       navigate('/test')
  //       console.log('please enter query')
  //   }

  // };
  return (
    <div style={{ width: '97vw', margin: 'auto', position: 'relative' }}>
      <div className="d-flex align-items-center justify-content-between mt-3 mx-2">
        <div className="d-flex align-items-center gap-3 ">
          <MenuIcon
            onClick={fetchCategory}
            className="buttonDiv d-none d-md-flex"
          />
          <strong>
            <Link
              style={{ fontSize: '24px' }}
              to="/"
              className="text-decoration-none d-md-none"
            >
              AloServices
            </Link>
          </strong>
        </div>
        <div>
          <Link to="/">
            <h2 className="d-none d-md-flex code">AloServices</h2>
          </Link>
        </div>

        <Link
          className="text-decoration-none d-none d-md-flex"
          to="/products/cart"
          style={{ position: 'relative', color: 'inherit' }}
        >
          <ShoppingCartOutlinedIcon
            style={{ color: 'orange', height: '40px', width: '40px' }}
          />
          {cartItems && (
            <Badge
              className="p-1"
              style={{
                position: 'absolute',
                borderRadius: '20px',
                top: -5,
                right: -2,
              }}
              bg="danger"
            >
              {cartItems?.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
          )}
        </Link>

        <div className=" d-flex  align-items-center mb-2">
          {userInfo !== null ? (
            <FavoriteIcon
              onClick={() => navigate(`/user/profile/${userInfo?._id}`)}
              className="buttonDiv iconLove"
            />
          ) : (
            <FavoriteIcon onClick={handleSet} className="buttonDiv iconLove" />
          )}
          <div
            className="mx-2 d-none d-md-flex"
            onMouseOver={() => setIsOpen(!isOpen)}
          >
            {' '}
            {userInfo?.imgUrl ? (
              <img src={userInfo?.imgUrl} alt={''} />
            ) : (
              <Link>
                <AccountCircleIcon className="buttonDiv" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <SearchBar
        setIsClicked={setIsClicked}
        query={query}
        setQuery={setQuery}
      />

      {smallNav && (
        <div
          className="d-flex flex-wrap gap-2 align-items-center  d-md-flex d-none justify-content-between p-3 "
          style={{ margin: 'auto', width: '85%', fontSize: '12px' }}
        >
          <Link className="links">Sale</Link>
          <Link className="links">New Arivals</Link>
          <Link className="links">Mens Wear</Link>
          <Link className="links">Womens wear</Link>
          <Link className="links">Bags</Link>
          <Link className="links">Shoes</Link>
          <Link className="links">Sale</Link>
          <Link className="links">New Arivals</Link>
          <Link className="links">Mens Wear</Link>
          <Link className="links">Womens wear</Link>
          <Link className="links">Bags</Link>
          <Link className="links">Shoes</Link>
        </div>
      )}

      {open && (
        <div className="uploadComponent ">
          <Upload
            open={open}
            random={random}
            setRandom={setRandom}
            setOpen={setOpen}
          />
        </div>
      )}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            zIndex: '99999',
            borderRadius: '5px',
          }}
          className="homeBackGround borderDropdow p-4"
          onMouseLeave={() => setIsOpen(!isOpen)}
        >
          {/* <div className="text-end">
            <span
              onClick={() => setIsOpen(false)}
              className="fw-bold navHover fs-5 dropDownCancel"
              style={{position: 'absolute', right:70, top:5}}
            >
              {' '}
              X
            </span>
          </div> */}
          <div className="d-flex flex-column ">
            {userInfo ? (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  className={
                    location.pathname === `/user/profile/${userInfo?._id}`
                      ? ' navHover text-decoration-none NavdropLink fw-bold navActive'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                  to={`/user/profile/${userInfo?._id}`}
                >
                  {' '}
                  My Account
                </Link>
                <Link
                  className={
                    location.pathname === `/login`
                      ? ' navHover text-decoration-none NavdropLink fw-bold navActive'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                  onClick={LogoutHandler}
                >
                  Sign Out
                </Link>
                <Link
                  to={`/seller/${userInfo?._id}`}
                  className="text-black navHover text-decoration-none NavdropLink"
                >
                  My AloServices
                </Link>
                <Link
                  onClick={() => handleCloseOpen('order')}
                  to={`/user/profile/${userInfo?._id} `}
                  className={
                    openSection === 'order'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  My Orders
                </Link>
                <Link
                  onClick={() => handleCloseOpen('message')}
                  to={`/user/profile/${userInfo?._id} `}
                  className={
                    openSection === 'message'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  Message Center
                </Link>
                <Link
                  onClick={() => handleCloseOpen('wishlist')}
                  to={`/user/profile/${userInfo?._id} `}
                  className={
                    openSection === 'wishlist'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  Wishlist{' '}
                </Link>
                <Link
                  onClick={() => handleCloseOpen('following')}
                  to={`/user/profile/${userInfo?._id} `}
                  className={
                    openSection === 'following'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  My Favourite Stores
                </Link>
                <Link
                  onClick={() => handleCloseOpen('coupon')}
                  to={`/user/profile/${userInfo?._id} `}
                  className={
                    openSection === 'coupon'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  My Coupon
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/login"
                  className={
                    location.pathname === `/login`
                      ? ' navHover text-decoration-none NavdropLink fw-bold navActive'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  Sign In
                </Link>
                <Link
                  onClick={handleSet}
                  className={
                    openSection === 'message'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  Message Center
                </Link>
                <Link
                  onClick={handleSet}
                  className={
                    openSection === 'wishlist'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  Wishlist{' '}
                </Link>
                <Link
                  onClick={handleSet}
                  className={
                    openSection === 'following'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  My Favourite Stores
                </Link>
                <Link
                  onClick={handleSet}
                  className={
                    openSection === 'coupon'
                      ? 'sectionStyle navHover navActive text-decoration-none'
                      : 'text-black navHover text-decoration-none NavdropLink'
                  }
                >
                  My Coupon
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {catOpen && (
        <div
          className={`categoryButton ${catOpen ? 'show' : ''}`}
          onClick={() => setCatOpen(false)}
        >
          <div style={{ width: '400px' }} className="trans">
            <Category setCatOpen={setCatOpen} categories={categories} />
          </div>
          {/* <div className='d-none'><Test query={query}/></div> */}
        </div>
      )}
    </div>
  );
}

export default NaviBar;
