import React, { useReducer, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CancelIcon from '@mui/icons-material/Cancel';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import axios from 'axios';
import { apiUrl } from '../utils/ApiConfig';
import { useSelector } from 'react-redux';
import LoadingBox from '../utils/LoadingBox';
import { toast } from 'react-toastify';

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

function Upload(props) {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  const { setOpen, random, setRandom, uploadOpen, handleUploadOpen } = props;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [discount, setDiscount] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const imageRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const { userInfo } = useSelector((state) => state.user);

  const [specifications, setSpecifications] = useState([
    { title: '', description: '' },
  ]);

  const [sizes, setSizes] = useState([{ size: '' }]);

  const addColor = () => {
    setSizes([...sizes, { size: '' }]);
  };

  const handleColorChange = (index, key, value) => {
    const updatedsizes = [...sizes];
    updatedsizes[index][key] = value;
    setSizes(updatedsizes);
  };

  const removeColor = (index) => {
    const updatedColor = [...sizes];
    updatedColor.splice(index, 1);
    setSizes(updatedColor);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { title: '', description: '' }]);
  };

  const handleSpecificationChange = (index, key, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][key] = value;
    setSpecifications(updatedSpecifications);
  };

  const removeSpecifications = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_START' });
    const file = imageRef.current.files[0];
    const fileName = file.name + Date.now().toString();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (progress > 0) {
          setUploadProgress(progress);
        }
        setUploadProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const validSpecifications = specifications.filter(
            (spec) => spec.title.trim() !== '' && spec.description.trim() !== ''
          );

          const validSizes = sizes.filter((size) => size.size.trim() !== '');

          const formdetails = {
            name: name,
            price: price,
            discount: discount,
            desc: desc,
            brand: brand,
            countInStock: countInStock,
            freeShipping: freeShipping,
            imgUrl: downloadURL,
            userId: userInfo?._id,
            sizes: validSizes,
            specifications: validSpecifications,
          };
          try {
            axios.post(`${apiUrl}/api/products`, formdetails).then((res) => {
              setRandom([...random, res.data]);
            });
            setOpen(false);
            dispatch({ type: 'FETCH_SUCCESS' });
            toast.success('Done', {
              toastId: 'unique-toast-id',
              autoClose: 500,
            });
          } catch (error) {
            dispatch({ type: 'FETCH_FAILURE' });
            toast.error('error', {
              toastId: 'unique-toast-id',
              autoClose: 500,
            });
          }
        });
      }
    );
  };

  return (
    <div className="mt-1 " style={{zIndex:"9999"}}>
      <Form onSubmit={handlePost}>
        <Card className="p-5 closeIconBody">
          <div className=" gap-5">
            <h3
              style={{ borderBottom: '2px solid black', opacity: '0.8' }}
              className="p-1 text-center"
            >
              Upload Products
            </h3>
            <span onClick={() => handleUploadOpen(!uploadOpen)} className="closeIcon">
              <CancelIcon />
            </span>
          </div>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Product Name</InputGroup.Text>
              <Form.Control
                type="text"
                value={name}
                placeholder=" "
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Price</InputGroup.Text>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>discount</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={(e) => {
                  const inputValue = Math.min(e.target.value, 100);
                  setDiscount(inputValue);
                }}
                max={100}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Brand</InputGroup.Text>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Count in stock</InputGroup.Text>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                label="Images"
                type="file"
                ref={imageRef}
                onChange={(e) => setImgUrl(e.target.files[0])}
              />
            </InputGroup>
            <InputGroup
              controlId="specifications"
              className="mb-3 d-flex flex-column"
            >
              <strong> Specifications:</strong>

              {specifications?.map((spec, index) => (
                <Row key={index} style={{ width: '300px' }} className="mb-3">
                  <Col md={5}>
                    <Form.Control
                      type="text"
                      value={spec.title}
                      placeholder="Title"
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          'title',
                          e.target.value
                        )
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Value"
                      value={spec.description}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                    />
                  </Col>
                  <Col md={1} className=" fs-4 closeIconSpecification">
                    {' '}
                    <div onClick={() => removeSpecifications(index)}>x</div>
                  </Col>
                </Row>
              ))}
              <Button className="mb-3" onClick={addSpecification}>
                {' '}
                Add Specifications
              </Button>
            </InputGroup>
            <InputGroup
              controlId="color"
              className="mb-3 d-flex gap-3"
              style={{ width: '300px' }}
            >
              <Form.Label>
                <strong>Color(s):</strong>
              </Form.Label>
              {sizes?.map((c, index) => (
                <Row key={index} style={{ width: '100px' }}>
                  <Col style={{ position: 'relative' }}>
                    <Form.Control
                      type="number"
                      placeholder="e.g 42"
                      value={c.size}
                      onChange={(e) =>
                        handleColorChange(index, 'size', e.target.value)
                      }
                    />
                    <span
                      onClick={() => removeColor(index)}
                      className="fs-4 closeIconSpecification"
                      style={{ position: 'absolute', top: 0, right: '0' }}
                    >
                      x
                    </span>
                  </Col>
                </Row>
              ))}
              <Button onClick={addColor}>Add Sizes</Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Check
                label="Free Shipping"
                type="checkbox"
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
              />
            </InputGroup>
            <div className="d-grid">
              <Button type="submit" disabled={loading}>
                {' '}
                {loading ? (
                  <div>
                    <LoadingBox>
                      {uploadProgress && <strong>{uploadProgress}</strong>}
                    </LoadingBox>
                  </div>
                ) : (
                  'Post'
                )}{' '}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default Upload;
