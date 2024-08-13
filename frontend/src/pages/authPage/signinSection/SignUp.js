import React, { useEffect, useState } from 'react';
import '../signupSection/signin.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LockIcon from '@mui/icons-material/Lock';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../../../utils/ApiConfig';
import { loginStart, loginSuccess } from '../../../redux/userSection/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../../../utils/LoadingBox';
import NaviBar from '../../../navSection/NaviBar';
import { toast } from 'react-toastify';
import Footer from '../../footerPage/Footer';

function SignUp() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rememberme, setRememberme] = useState('good');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRememberMeChange = (event) => {
    setRememberme(event.target.checked);
  };

  //   SIGNIN HANDLER

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(true);
    try {
      const user = {
        name,
        email,
        password,
      };
      const { data } = await axios.post(`${apiUrl}/api/users/signup`, user);
      dispatch(loginSuccess(data));
      navigate('/');
      setLoading(false);
    } catch (error) {
      toast.error('error', { toastId: 'unique-toast-id', autoClose: 500 });
      setLoading(false);
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
    <div>
      {' '}
      <NaviBar />
      <Form onSubmit={handleSignIn}>
        <div className="d-flex my-5 flex-colum justify-content-center align-items-center centeringDiv">
          <div className="centerDivBorder">
            {' '}
            <div className="text-center mb-4 d-flex flex-column pt-5">
              <span>
                <LockIcon className="buttonBorder11" style={{ color: 'red' }} />
              </span>
              <strong>REGISTER </strong>
            </div>
            <div className="px-5">
              {' '}
              <InputGroup className="mb-3">
                <Form.Control
                  type="name"
                  className="px-5 py-3"
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
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
                <Button type="submit">
                  SIGN UP
                  {loading && <LoadingBox />}
                </Button>
              </div>
              <div className="pb-5">
                <strong style={{fontSize:"15px"}} className=" d-flex gap-1">
                  Already have an account ?<Link to="/login">Sign in here</Link>
                </strong>
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

export default SignUp;
