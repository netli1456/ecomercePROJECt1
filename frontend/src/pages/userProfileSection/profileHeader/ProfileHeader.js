import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';


function ProfileHeader({ cartNav, orderNav, profileNav, previousSection,  handleSection, }) {
  return (
    <div
      style={{ width: '100%', borderBottom: '1x solid grey' }}
      className="colBG p-3  d-flex align-items-center"
    >
     { profileNav && <div>
        <KeyboardArrowLeftOutlinedIcon onClick={()=>handleSection(previousSection)}
          style={{ height: '40px', width: '40px' }}
        />
      </div>}
      <div
        style={{ width: '100%' }}
        className=" px-2  d-flex align-items-center justify-content-between mb-"
      >
        <div className="d-flex flex-column ">
          <strong>
            <Link style={{fontSize:"20px"}} to="/" className="text-decoration-none ">
              AloServices
            </Link>
          </strong>

          {profileNav && <strong>Account</strong>}
          {cartNav && <strong>Shopping Cart Items</strong>}
          {orderNav && <strong style={{color:"orangered"}}>Place Your Order In 3 steps</strong>}
        </div>
        <div className="d-flex align-items-center gap-3">
          
            <Link to='/test/search'><SearchOutlinedIcon style={{ height: '40px', width: '40px' }} /></Link>
          
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
