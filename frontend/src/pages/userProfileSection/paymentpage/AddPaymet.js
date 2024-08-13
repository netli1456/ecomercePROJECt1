import React, { useEffect } from 'react';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import '../profile.css';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AddPaymet(props) {
  const { paySetOpen } = props;
  const navigate= useNavigate()
const {userInfo}= useSelector((state)=>state.user)
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <div className="colBG d-flex align-items-center justify-content-between p-3 mb-3">
        <strong>Payment</strong>
        <div style={{ fontSize: '19px' }} className="">
          Settings <NavigateNextOutlinedIcon />
        </div>
      </div>
      <div className="colBG p-3">
        <strong>Cards</strong>
        <div
          onClick={() => paySetOpen(true)}
          className="profileBG d-flex align-items-center justify-content-center"
          style={{ width: '50%', height: '150px', cursor: 'pointer' }}
        >
          <strong>
            <AddCircleOutlineOutlinedIcon /> Add New Card
          </strong>
        </div>
        <p className="p-2">No cards saved. Add one below to get started.</p>
      </div>
    </div>
  );
}

export default AddPaymet;
