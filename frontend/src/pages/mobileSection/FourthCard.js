import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import MobileCard from '../../components/MobileCard';
import { Link } from 'react-router-dom';

function FourthCard(props) {
    const {productLowprice}=props;

  return (
    <div>
        <div className="" style={{}}>
              <div className="bg-ligh d-flex gap-1 flex-column my-3 mb-2 ">
                {' '}
                <strong>
                  weekly <span>Deals</span> <TrendingFlatIcon />
                </strong>
                <span>Top products incredible prices</span>
              </div>

              <div className="d-flex gap-2">
                {productLowprice?.slice(0,3).map((product) => (
                  <Link
                    to={`products/${product._id}`}
                    key={product._id}
                    className="text-decoration-none text-black "
                    style={{ width: '200px' }}
                  >
                    <MobileCard product={product} />
                  </Link>
                ))}
              </div>
            </div>
    </div>
  )
}

export default FourthCard