import React from 'react';
import Card from 'react-bootstrap/Card';

function Cards(props) {
  const { product } = props;

  const originalPrice = product?.price; // Get the original price from the product
  const discountPrice = product?.discount;

  // Get the discount percentage from the product
  const discountPercentage = discountPrice / 100;

  // Convert discount percentage to a decimal
  const discountedPrice = originalPrice - originalPrice * discountPercentage;

  const formattedDiscountPercentage = (discountPercentage * 100).toFixed(0);

  return (
    <Card
      style={{ border: 'none', maxHeight: '120px', minHeight: '110px' }}
      className="disCount"
    >
      <div style={{ position: 'relative', borderRadius: '10px' }}>
        <img
          src={product?.imgUrl}
          alt={product?.name}
          style={{
            width: '100%',
            minHeight: '100px',
            maxHeight: '100px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
        <span
          className={''}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: 'rgb(240, 166, 30)',
            color: 'white',
          }}
        >
          {<>{formattedDiscountPercentage}%</>}
        </span>
      </div>
    </Card>
  );
}

export default Cards;
