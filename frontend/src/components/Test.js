// SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/ApiConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NaviBar from '../navSection/NaviBar';
import MobileCard from './MobileCard';
import HomeCard from './HomeCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

function Test(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked && query) {
      const fetchSearchResults = async () => {
        try {
          const { data } = await axios.get(
            `${apiUrl}/api/products/searchingproducts?query=${query}`
          );
          console.log('search products', data);
          setSearchResults(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSearchResults();
    }
  }, [query, isClicked]);

  return (
    <div >
      <NaviBar setIsClicked={setIsClicked} query={query} setQuery={setQuery} />
      <div className='p-3'>
      <h4 className='mb-5'>  {isClicked === true ? `${searchResults.length} results for : ${query}` : ''}</h4>
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
        className=""
      >
        <Masonry gutter="10px">
          {searchResults.map((product) => (
            <Link to={`/products/${product._id}`} className='text-decoration-none' style={{color:"inherit"}}>
              <HomeCard product={product} />
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Test;
