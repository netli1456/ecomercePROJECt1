import React from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function HomeCard({ product }) {
  const originalPrice = product.price; // Get the original price from the product
  const discountPercentage = product.discount; // Get the discount percentage from the product
  const discountDecimal = discountPercentage / 100; // Convert discount percentage to a decimal
  const discountedPrice = originalPrice - originalPrice * discountDecimal;

  

  return (
    <div className="">
      <div className="mb-2 homeCardBg">
        <div
          style={{ border: 'none' }}
          className="d-flex flex-column align-items-center"
        >
          <div className="d-flex flex-column align-items-center homeCardWidth">
            <img
              src={product.imgUrl}
              alt=""
              style={{
                minHeight: '180px',
                maxHeight: '180px',
                width: '96%',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
              className=""
            />
            <h5>
              NGN
              {discountedPrice !== undefined &&
              String(discountedPrice).length > 5
                ? `${String(discountedPrice).slice(0, 5)}...`
                : discountedPrice.toFixed(2)}
            </h5>
            <div style={{ opacity: '0.7', textDecoration: 'line-through' }}>
              NGN{product.price}
            </div>
            <div className="text-capitalize">{product?.name.length >=15 ? `${product?.name.slice(0,15)}...`  : product.name}</div>
            <div style={{ color: 'green' }}>
              {product?.freeShipping ? 'Free shipping' : ''}
            </div>
          </div>
          <span className="text-center similarItems">
            {' '}
            <TravelExploreIcon /> Similar items
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
