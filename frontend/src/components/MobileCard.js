import React from 'react';

function MobileCard({ product }) {
  return (
    <div className="">
      <div className="mb-2 homeCardBgs ">
        <div style={{ border: 'none' }} className="">
          <div
            style={{ minHeight: '290px', width: '100%', maxHeight: '290px' }}
            className="d-flex flex-column align-items-center"
          >
            <img
              src={product?.imgUrl}
              alt=""
              style={{
                minHeight: '180px',
                maxHeight: '180px',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
              className=""
            />
            <h5>NGN{product?.discountedPrice}</h5>
            <div style={{ opacity: '0.7', textDecoration: 'line-through' }}>
              NGN{product?.price}
            </div>
            
            <div style={{ color: 'green' }}>
              {product?.freeShipping ? 'Free shipping' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCard;
