import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useSelector } from 'react-redux';
function Settings() {
  const navigate= useNavigate()
const {userInfo}= useSelector((state)=>state.user)
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <div className="colBG p-3 mb-3">
        <strong>Settings</strong>
      </div>
      <div className='colBG p-3'>
        <div>
          <p >Personal Information</p>
        </div>
        <div style={{width:"90%", margin:"auto"}} className='py-4 d-flex justify-content-between gap-5'>
          <Link  className=' smallp text-decoration-none' >Upload picture</Link>
          <Link to={`/edit/profile/${userInfo?._id}`} className=' smallp text-decoration-none'>Edit profile</Link>
          <Link to={`/edit/profile/${userInfo?._id}`} className=' smallp text-decoration-none'>Country/region</Link>
        </div>
        <div className=' p-3'>
        <div>
          <p >Security Information</p>
        </div>
        <div style={{width:"90%"}} className='py-4 justify-content-between d-flex gap-5'>
          <Link to={`/edit/profile/${userInfo?._id}`} className='text-decoration-none smallp' >Change email address</Link>
          <Link    className=' text-decoration-none smallp'>Change password</Link>
          <Link className='text-decoration-none smallp'>Set security question</Link>
        </div>
      </div>
        <div className=' p-3'>
        <div>
          <p >Activate email notifications</p>
        </div>
        <div className='py-4 mx-4 d-flex gap-5'>
          <Link to={`/edit/profile/${userInfo?._id}`} className='text-decoration-none smallp' >Activate</Link>
          
        </div>
      </div>
        <div className=' p-3'>
        <div>
          <p >Social media account</p>
        </div>
        <div className='py-4 mx-4 d-flex gap-3 smallp'>
        <div><ChatOutlinedIcon className='messageCo'/> Messenger</div><Link className='text-decoration-none smallp' >link</Link>
          
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default Settings;
