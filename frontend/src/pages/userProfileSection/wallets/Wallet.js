import React, { useEffect } from 'react';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Wallet() {
  const navigate= useNavigate()
const {userInfo}= useSelector((state)=>state.user)
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <div className="colBG p-3">
      <h5>Cards & Bank Accounts</h5>
      <div
        style={{ height: '600px' }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className='p-3 wallet' style={{ borderRadius:"50%"}}>
          <CardGiftcardOutlinedIcon
            style={{ height: '60px', width: '60px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Wallet;
