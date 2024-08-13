import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { apiUrl } from '../../utils/ApiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriends } from '../../redux/userSection/userSlice';
import {
  addUserProductFriends,
  singleUserSuccess,
} from '../../redux/userSection/singleProductSlice';

import Upload from '../../components/Upload';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Carousel from 'react-bootstrap/Carousel';
import NaviBar from '../../navSection/NaviBar';

function ProductHeader(props) {
  const [open, setOpen] = useState(false);
  const { product, own, handleUploadOpen, uploadOpen } = props;

  const { userInfo } = useSelector((state) => state.user);
  const { singleProductUser } = useSelector((state) => state.single);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get(`${apiUrl}/api/users/${product}`);
          dispatch(singleUserSuccess(data));
        } catch (error) {
          toast.error('Error', { toastId: 'unique-toast-id', autoClose: 500 });
        }
      };

      fetchUser();
    }
  }, [product, dispatch]);

  const addFollowHandler = async (id, friendId) => {
    try {
      await axios.put(`${apiUrl}/api/users/addfollows/${id}/${friendId}`);

      dispatch(addFriends(friendId));
      dispatch(addUserProductFriends(id));
    } catch (error) {
      toast.error('Error adding friend', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
    }
  };

  const data = {
    images: [
      '/images/discount2.jpg',
      '/images/discount4.jpg',
      '/images/discount3.jpg',
    ],
  };

  useEffect(() => {
    if (open) {
      document.body.style.height = '100vh';
      document.body.style.overflow = '100vh';
    }
  });

  return (
    <div>
      <div>
        {own === true && (
          <div
            className={
              uploadOpen === true
                ? 'userSellerUploadOpen1 d-none'
                : 'userSellerUploadOpen'
            }
          >
            <NaviBar />
          </div>
        )}
        <div
          className="d-none d-md-flex"
          style={{ marginBottom: 'px' }}
        ></div>
      </div>

      <div
        className={
          uploadOpen === true
            ? 'singleProductHeader1 headerselleropen'
            : 'singleProductHeader1 headerselleropen1'
        }
      >
        <div
          className={
            uploadOpen === true ? 'bgNavSize ' : 'bgNavSize headerselleropen3'
          }
        >
          <div className="d-flex justify-content-between align-items-center gap-2 ">
            {singleProductUser?.storeImg ? (
              <Link to={`/seller/${singleProductUser?._id}`}>
                <img
                  src={singleProductUser?.storeImg}
                  alt=""
                  className="imageStyle text-decoration-none"
                />
              </Link>
            ) : (
              <Link
                to={`/seller/${singleProductUser?._id}`}
                className="imageStyle d-flex align-items-center justify-content-center text-decoration-none"
                style={{ border: '1px solid white' }}
              >
                <AccountCircleIcon />
              </Link>
            )}
            <Link
              to={`/seller/${singleProductUser?._id}`}
              className=" text-decoration-none"
              style={{ color: 'inherit' }}
            >
              <Button
                style={{ borderRadius: '20px' }}
                variant="lighter"
                className="text-capitalize bg-white fw-bold text-black d-none d-md-flex"
              >
                {' '}
                {singleProductUser?.storeName}{' '}
              </Button>
              <strong
                style={{ fontSize: '12px', borderRadius: '' }}
                className="text-capitalize p-1 bg-white text-black d-md-none"
              >
                {' '}
                {singleProductUser?.storeName?.lenght >= 10 ? `${singleProductUser?.storeName?.slice(0,10)}...` : singleProductUser?.storeName}
              </strong>
            </Link>
          </div>

          <div className="d-flex bg-white align-items-center gap-4">
            {singleProductUser && singleProductUser?._id === userInfo?._id ? (
              <div className="d-flex align-items-center ">
                {own && (
                  <Button
                    variant="lighter"
                    onClick={() => handleUploadOpen(!uploadOpen)}
                    style={{
                      borderRight: '1px solid white',
                      cursor: 'pointer',
                    }}
                    className="d-flex bg-white  gap-2 align-items-center"
                  >
                    <AddPhotoAlternateIcon />{' '}
                    <strong
                      className="d-md-none text-black"
                      style={{ paddingRight: '1rem', fontSize: '14px' }}
                    >
                      Upload
                    </strong>
                    <strong
                      className="d-none text-black d-md-flex"
                      style={{ paddingRight: '1rem' }}
                    >
                      Upload
                    </strong>
                  </Button>
                )}

                <span
                  className="px-3 bg-white text-black d-none  d-md-flex"
                  style={{ borderRight: '1px solid white' }}
                >
                  {' '}
                  <strong className="mx-1 ">0.0 </strong>Positive Feedbacks
                </span>

                <span
                  className="d-none text-black d-md-flex px-3"
                  style={{ borderRight: '1px solid white' }}
                >
                  {' '}
                  <strong className="mx-1">
                    {singleProductUser?.followers?.length}{' '}
                  </strong>
                  Followers
                </span>
                <span className="d-none text-black d-md-flex px-3">
                  {' '}
                  <strong className="mx-1">
                    {singleProductUser?.following?.length}{' '}
                  </strong>{' '}
                  Following
                </span>
              </div>
            ) : (
              <>
                <span
                  className="px-3 bg-white text-black d-none  d-md-flex"
                  style={{ borderRight: '1px solid white' }}
                >
                  {' '}
                  <strong className="mx-1 ">0.0 </strong>Positive Feedbacks
                </span>
                <span className="d-none text-black d-md-flex">
                  {' '}
                  <strong className="mx-1">
                    {singleProductUser?.followers?.length}{' '}
                  </strong>
                  Followers
                </span>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    onClick={() =>
                      addFollowHandler(userInfo?._id, singleProductUser?._id)
                    }
                    style={{ borderRadius: '20px', border: '1px solid grey' }}
                    variant="light"
                  >
                    {userInfo?.following?.includes(singleProductUser?._id) ? (
                      <div>
                        <strong className="d-none d-md-flex">Following</strong>
                        <strong
                          style={{ fontSize: '13px' }}
                          className="d-md-none"
                        >
                          Following
                        </strong>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <AddIcon />
                        <strong className="d-none d-md-flex">Follow</strong>
                        <strong
                          style={{ fontSize: '13px' }}
                          className="d-md-none"
                        >
                          Follow
                        </strong>
                      </div>
                    )}
                  </Button>
                  <Button
                    style={{ borderRadius: '20px', border: '1px solid grey' }}
                    variant="light"
                  >
                    <div className="d-flex align-items-center">
                      <SmsOutlinedIcon />
                      <strong style={{ fontSize: '13px' }}>Message</strong>
                    </div>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
          }}
        >
          <Carousel>
            {data.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  style={{ width: '100%', height: '65px', objectFit: 'cover' }}
                  src={img}
                  alt=""
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="singleProductHeader2">
        <div className="bgNavSize1">
          <div className="d-flex align-items-center gap-5 ">
            <strong
              style={{ fontSize: '14px' }}
              className="d-md-none text-capitalize"
            >
              {' '}
              Store Home{' '}
            </strong>
            <strong className="text-capitalize d-none d-md-flex">
              {' '}
              Store Home{' '}
            </strong>
            <strong
              style={{ fontSize: '14px' }}
              className="d-md-none text-capitalize"
            >
              {' '}
              Products <KeyboardArrowDownIcon />
            </strong>
            <strong className=" d-none d-md-flex text-capitalize">
              {' '}
              Products <KeyboardArrowDownIcon />
            </strong>
            <strong className="d-none d-md-flex text-capitalize">
              {' '}
              Sale Items{' '}
            </strong>
            <strong className="d-none d-md-flex text-capitalize">
              {' '}
              Top Selling{' '}
            </strong>
            <strong className="d-none d-md-flex text-capitalize">
              {' '}
              Feedback{' '}
            </strong>
          </div>
        </div>
        {uploadOpen === true && (
          <div className="uploadComponent">
            <Upload
              handleUploadOpen={handleUploadOpen}
              open={open}
              setOpen={setOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductHeader;
