import React, { useEffect, useState } from 'react';
import { apiUrl } from '../utils/ApiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import HomeCard from './HomeCard';
import MobileCard from './MobileCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';

function Recomended() {
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/allproducts`);
        
        setRecommended(data);
      } catch (error) {
        toast.error('error fetching recommended products', {
          toastId: 'unique-toast-id',
        });
      }
    };
    fetchRecommended();
  }, []);
  return (
    <div style={{width:"95%", margin:"auto"}}>
        <h2 className=' mb-5 text-center' style={{borderBottom:"1px solid  rgb(201, 197, 197) "}}>More to love</h2>
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
        <Masonry gutter='10px'>
              {recommended?.slice(0,14).map((product)=>(
                <Link className='text-decoration-none ' style={{color:"inherit"}} key={product._id} to={`/products/${product._id}`}>
                <HomeCard product={product}/>
                </Link>
              ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Recomended;
