import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeCard from './HomeCard';

function Filter(props) {
  const { product  } = props;
  return (
    <div>
      <h1>Filtered Products</h1>
      <div className="row">
       
          <div className="col-md-4" >
            <HomeCard product={product} />
          </div>
   
      </div>
    </div>
  );
}

export default Filter;
