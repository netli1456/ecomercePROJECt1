import React, { useEffect, useState } from 'react';
import './signin.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LockIcon from '@mui/icons-material/Lock';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { loginStart, loginSuccess } from '../../../redux/userSection/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NaviBar from '../../../navSection/NaviBar';
import { toast } from 'react-toastify';
import Footer from '../../footerPage/Footer';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberme, setRememberme] = useState('good');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRememberMeChange = (event) => {
    setRememberme(event.target.checked);
  };

  //   SIGNIN HANDLER

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = {
        email,
        password,
      };

      const { data } = await axios.post(`${apiUrl}/api/users/signin`, user);
     

      dispatch(loginSuccess(data));
      
      toast.success('Signed in successfully',{toastId: "unique-toast-id", autoClose:3000}, );

      navigate('/');
    } catch (error) {
      toast.error('Incorrect email or password',{toastId: "unique-toast-id", autoClose:3000}, );

    }
  };
  useEffect(() => {
    const scrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = scrollRestoration;
    };
  }, []);
  return (
    <div><NaviBar />
    <Form onSubmit={handleSignIn}>
      <div className="d-flex flex-colum justify-content-center align-items-center centeringDiv">
        <div className="centerDivBorder">
          {' '}
          <div className="text-center mb-4 d-flex flex-column pt-5">
            <span>
              <LockIcon className="buttonBorder11" style={{ color: 'red' }} />
            </span>
            <strong>SIGN IN</strong>
          </div>
          <div className="px-5">
            {' '}
            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                className="px-5 py-3"
                value={email}
                placeholder="Email Address*"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Form.Control
                className="px-5  py-3"
                type="password"
                value={password}
                placeholder="password*"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mt-2 d-flex align-items-center mb-3 gap-2">
              <InputGroup.Checkbox
                id="good"
                name="good"
                value="good"
                checked={rememberme}
                onChange={handleRememberMeChange}
                aria-label="Checkbox for following text input"
              />
              <Form.Label>Remember me</Form.Label>
            </InputGroup>
            <div className="d-grid mb-3">
              <Button type="submit">SIGN IN</Button>
            </div>
            <div className='pb-5'>  
              <strong className=' d-flex gap-2'>Dont have an account ?<Link to="/signup">Sign up here</Link></strong>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <footer>
            <Footer />
          </footer>
    </div>
  );
}

export default SignIn;
