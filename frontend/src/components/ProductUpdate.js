import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';
import { apiUrl } from '../utils/ApiConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../utils/LoadingBox';

function ProductUpdate(props) {
  const { product,  setUpdate, setDeleteButton } = props;
  const [name, setName] = useState(product.name || '');
  const [brand, setBrand] = useState(product.brand || '');
  const [price, setPrice] = useState(product.price || '');
  const [discount, setDiscount] = useState(product.discount || '');
  const [freeShipping, setFreeShipping] = useState(false);
  const [desc, setDesc] = useState(product.desc || '');
  const [imgUrl, setImgUrl] = useState('');
  const imageRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      discount: discount,
      freeShipping: freeShipping,
      price: price,
      brand: brand,
      desc: desc,
    };
    setLoading(true);
    try {
      await axios.put(
        `${apiUrl}/api/products/${product._id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setUpdate(false);
      navigate(`/products/${product._id}`);
      toast.success('updated successfully', {
        toastId: 'unique-toast-Id',
        autoClose: 3000,
      });
      setLoading(false);
    } catch (error) {
      toast.error('error updating product', {
        toastId: 'unique-toast-Id',
        autoClose: 3000,
      });
    }
  };

  const handleFreeShippingChange = (e) => {
    const { id } = e.target;
    if (id === 'freeShippingYes') {
      setFreeShipping(true);
    } else if (id === 'freeShippingNo') {
      setFreeShipping(false);
    }
  };
  const handleCloseButton = () => {
    setUpdate(false);
    setDeleteButton(false);
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div
      style={{  borderRadius: '5px', backgroundColor: 'white',  }}
      className="d-flex p-5 flex-column align-items-center justify-content-center"
    >
      <div>
        <h3>Update Product</h3>
      </div>
      <Form
        style={{ backgroundColor: 'white' }}
        onSubmit={handleUpdate}
        className="d-flex flex-column gap-1"
      >
        <FormGroup>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Images</Form.Label>
          <Form.Control
            value={imgUrl}
            ref={imageRef}
            onChange={(e) => setImgUrl(e.target.files[0])}
            type="file"
          />
        </FormGroup>
        <Form.Group style={{ borderBottom: '1px solid grey' }}>
          <Form.Label>Free Shipping</Form.Label>
          <Form.Check
            type="checkbox"
            label="Yes"
            id="freeShippingYes"
            checked={freeShipping}
            onChange={handleFreeShippingChange}
          />
          <Form.Check
            type="checkbox"
            label="No"
            id="freeShippingNo"
            checked={!freeShipping}
            onChange={handleFreeShippingChange}
          />
        </Form.Group>
        <div
          style={{ width: '70%', margin: 'auto' }}
          className="d-flex gap-3 align-items-center justify-content-between"
        >
          <Button
            onClick={handleCloseButton}
            variant="lighter"
            className="bg-secondary text-white fw-bold"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="lighter"
            className="bg-danger text-white fw-bold"
          >
            {loading ? <LoadingBox /> : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductUpdate;
