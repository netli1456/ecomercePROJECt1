import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { apiUrl } from '../../../utils/ApiConfig';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileCard from '../../../components/MobileCard';
import HomeCard from '../../../components/HomeCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import LoadingBox from '../../../utils/LoadingBox';
function WishList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const wishList = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/products/${userInfo._id}/wishlistproducts`
        );
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    wishList();
  }, [userInfo]);
  return (
    <div>
      <div>
        <div className="colBG d-flex align-items-center gap-3 p-3 mb-3">
          <strong className='fs-5'>All Wishlist Items ({data?.length})</strong>
          <span>My list (0)</span>
        </div>
        {loading ? (
          <LoadingBox />
        ) : (
          <div>
            {data.length >= 1 ? (
              <div className="colBG p-3">
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    0: 1,
                    350: 2, 
                    800: 3,
                    1200: 4,
                    1600: 5, 
                    9999: 6,
                  }}
                >
                  <Masonry gutter="10px">
                    {data.map((product) => (
                      <Link
                        className=" text-decoration-none"
                        style={{ color: 'inherit' }}
                        to={`/products/${product._id}`}
                      >
                        <HomeCard product={product} />
                      </Link>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            ) : (
              <div
                className="colBG d-flex align-items-center justify-content-center"
                style={{ height: '70vh' }}
              >
                <div className="d-flex flex-column gap-3">
                  <div>
                    <SnowshoeingIcon
                      style={{ width: '100px', height: '100px' }}
                      className="wishListIcon"
                    />
                  </div>
                  <strong> It is empty here</strong>
                  <Button>start shopping</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
