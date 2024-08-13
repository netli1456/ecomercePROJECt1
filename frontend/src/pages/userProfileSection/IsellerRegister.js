import React, { useEffect, useReducer, useRef, useState } from 'react';
import LoadingBox from '../../utils/LoadingBox';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

import Button from 'react-bootstrap/esm/Button';
import { ref } from 'firebase/storage';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { toast } from 'react-toastify';
import Footer from '../footerPage/Footer';
import ProfileHeader from './profileHeader/ProfileHeader';
import NaviBar from '../../navSection/NaviBar';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function IsellerRegister() {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });

  const { userInfo } = useSelector((state) => state.user);

  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [storeImg, setStoreImg] = useState(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleSeller = async (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_START' });

    const storeData = {
      storeName: storeName,
      address: address,
      isSeller: true,
      storeCreatedAt: Date.now(),
    };

    try {
      axios
        .put(`${apiUrl}/api/users/update/${userInfo?._id}`, storeData)
        .then((res) => {});

      dispatch({ type: 'FETCH_SUCCESS' });
      navigate(`/seller/${userInfo?._id}`);
      toast.success('Store created successfully', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
    } catch (error) {
      toast.error('error', {
        toastId: 'unique-toast-id',
        autoClose: 500,
      });
      dispatch({ type: 'FETCH_FAILED' });
    }
  };
  // const handleSeller = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: 'FETCH_START' });
  //   const file = imageRef?.current?.files[0];
  //   const fileName = file.name + Date.now().toString();
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );

  //       if (progress > 0) {
  //         setPercentage(progress);
  //       }
  //       switch (snapshot.state) {
  //         case 'paused':
  //           break;
  //         case 'running':
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => {
  //       toast.error('error creating store', {
  //         toastId: 'unique-toast-id',
  //         autoClose: 500,
  //       });
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         const storeData = {
  //           storeName: storeName,
  //           address: address,
  //           isSeller: true,
  //           storeCreatedAt: Date.now(),
  //           storeImg: downloadURL,
  //         };

  //         try {
  //           axios
  //             .put(`${apiUrl}/api/users/${userInfo?._id}`, storeData)
  //             .then((res) => {});

  //           dispatch({ type: 'FETCH_SUCCESS' });
  //           navigate(`/seller/${userInfo?._id}`);
  //           toast.success('Store created successfully', {
  //             toastId: 'unique-toast-id',
  //             autoClose: 500,
  //           });
  //         } catch (error) {
  //           toast.error('error', {
  //             toastId: 'unique-toast-id',
  //             autoClose: 500,
  //           });
  //           dispatch({ type: 'FETCH_FAILED' });
  //         }
  //       });
  //     }
  //   );
  // };
  useEffect(() => {
    window.scrollTo(0, 0);

    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div
      className="mt-1 d-flex  flex-column align-items-center justify-content-center"
      style={{}}
    >
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
      <Form onSubmit={handleSeller}>
        <Card className="p-5 closeIconBody">
          <div className=" gap-5">
            <h3
              style={{ borderBottom: '2px solid black', opacity: '0.8' }}
              className="p-1 text-center"
            >
              Seller Registration
            </h3>
            <span className="closeIcon">Welcome</span>
          </div>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Store Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="e.g abc store"
                onChange={(e) => setStoreName(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Store Address</InputGroup.Text>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="write your store address"
                onChange={(e) => setAddress(e.target.value)}
                className="non-resizable"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                label="Images"
                type="file"
                ref={imageRef}
                onChange={(e) => setStoreImg(e.target.files[0])}
              />
            </InputGroup>

            <div className="d-grid">
              <Button type="submit" disabled={loading}>
                {' '}
                {loading ? (
                  <div>
                    <LoadingBox>
                      {percentage && <strong>{percentage}</strong>}
                    </LoadingBox>
                  </div>
                ) : (
                  <strong>Create store</strong>
                )}{' '}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
      <footer className="my-3">
        <Footer />
      </footer>
    </div>
  );
}

export default IsellerRegister;
