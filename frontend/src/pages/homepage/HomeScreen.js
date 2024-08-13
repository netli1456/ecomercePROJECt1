import React, { useEffect } from 'react';
import HomeGrid from '../../components/HomeGrid';
import NaviBar from '../../navSection/NaviBar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../footerPage/Footer';

function HomeScreen({ random }) {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
  if(userInfo){
    if (location.pathname !== `/user/profile/${userInfo._id}`) {
      localStorage.removeItem('openSection');
    }
  }
  }, [location.pathname, userInfo]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          width: '100vw',
          top: -10,
          zIndex: '999',
        }}
      >
        <NaviBar />
      </div>
      <div className="d-none d-md-flex" style={{ marginBottom: '100px' }}></div>
      <div className="d-md-none" style={{ marginBottom: '40px' }}></div>

      <div className="homeBackGround">
        <div style={{ width: '91vw', margin: 'auto' }}>
          <div>
            <HomeGrid product={random} />
          </div>
        </div>
      </div>
      <footer>
            <Footer />
          </footer>
    </div>
  );
}

export default HomeScreen;
