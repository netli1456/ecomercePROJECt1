import React from 'react';

import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import MobileCard from '../../components/MobileCard';
import { Link } from 'react-router-dom';
function FirstCard({ productLowDiscountprice, own }) {
 
  return (
    <div>
      <div className={ own ? 'd-none' : "bg-light d-flex gap-1  flex-column mt-3 mb-2"}>
        {' '}
        <strong>
          NEW USERS GIFT <TrendingFlatIcon />
        </strong>
        <span>items with low discounts prices</span>
      </div>

      <div className="d-flex gap-2">
        {productLowDiscountprice?.slice(0,3).map((product) => (
          <Link
            to={`/products/${product?._id}`}
            key={product?._id}
            className="text-decoration-none text-black "
            style={{ width: '200px' }}
          >
            <MobileCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FirstCard;
