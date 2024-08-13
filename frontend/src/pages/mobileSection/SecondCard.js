import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Link } from 'react-router-dom';
import MobileCard from '../../components/MobileCard';

function SecondCard(props) {
    const {productHighprice}=props;
  return (
    <div>
        <div className="">
              <div className="bg-light d-flex gap-1 flex-column mt-3 mb-2">
                {' '}
                <strong>
                  First come <span style={{ color: 'red' }}>50% off </span>
                  <TrendingFlatIcon />
                </strong>
                <span>Free shipping </span>
              </div>

              <div className="d-flex gap-2">
                {productHighprice?.slice(0,3).map((product) => (
                  <Link to={`products/${product._id}`} key={product._id} className="text-decoration-none text-black " style={{ width: '200px' }}>
                    <MobileCard product={product} />
                  </Link>
                ))}
              </div>
            </div>
    </div>
  )
}

export default SecondCard