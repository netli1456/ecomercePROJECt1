import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/esm/Badge';
import Category from '../../../components/Category';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { toast } from 'react-toastify';

function BottomHeader(props) {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const location = useLocation();

  const { filter } = props;

  return (
    <div
      style={{ width: '100%', borderBottom: '1px solid black' }}
      className="colBG px-3 py-1 d-flex align-items-center"
    >
      <div
        style={{ width: '100%' }}
        className="d-flex  align-items-center justify-content-between"
      >
        <Link
          to="/"
          className={
            location.pathname === '/'
              ? 'd-flex flex-column text-decoration-none headerBottomLocation'
              : 'd-flex flex-column text-decoration-none headerBottomLocation2'
          }
        >
          <HomeOutlinedIcon style={{ height: '40px', width: '40px' }} />
          <span style={{ fontSize: '12px' }}>Home</span>
        </Link>

        <div className="d-flex flex-column">
          <ListOutlinedIcon style={{ height: '40px', width: '40px' }} />
          <span style={{ fontSize: '12px' }}>Categories</span>
        </div>

        <Link
          to="/products/cart"
          className={
            location.pathname === '/products/cart'
              ? 'd-flex flex-column text-decoration-none headerBottomLocation'
              : 'd-flex flex-column text-decoration-none headerBottomLocation2'
          }
        >
          <div className="d-flex align-items-center">
            <ShoppingCartOutlinedIcon
              style={{ height: '40px', width: '40px' }}
            />
            <Badge bg="danger">
              {cartItems?.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
          </div>

          <span style={{ fontSize: '12px' }}>Cart</span>
        </Link>
        {userInfo ? (
          <Link
            to={`/user/profile/${userInfo?._id}`}
            className={
              location.pathname === `/user/profile/${userInfo?._id}`
                ? 'd-flex flex-column text-decoration-none headerBottomLocation'
                : 'd-flex flex-column text-decoration-none headerBottomLocation2'
            }
          >
            <PersonIcon style={{ height: '40px', width: '40px' }} />
            <span style={{ fontSize: '12px' }}>Account</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className={
              location.pathname === `/login`
                ? 'd-flex flex-column text-decoration-none headerBottomLocation'
                : 'd-flex flex-column text-decoration-none headerBottomLocation2'
            }
          >
            <PersonIcon style={{ height: '40px', width: '40px' }} />
            <span style={{ fontSize: '12px' }}>Account</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BottomHeader;
