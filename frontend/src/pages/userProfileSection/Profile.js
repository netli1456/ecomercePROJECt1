import React, { useEffect, useState } from 'react';
import './profile.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/ApiConfig';
import axios from 'axios';
import LoadingBox from '../../utils/LoadingBox';
import OverView from './overview/OverView';
import OrderCard from '../../components/OrderCard';
import Order from '../orderpage/Order';
import AddPaymet from './paymentpage/AddPaymet';
import Settings from './settings/Settings';
import ProfileShipping from './shippingAddress/ProfileShipping';
import RefundAndReturn from './refundReturn/RefundAndReturn';
import Wallet from './wallets/Wallet';
import Container from 'react-bootstrap/esm/Container';
import NaviBar from '../../navSection/NaviBar';
import ProfileHeader from './profileHeader/ProfileHeader';
import BottomHeader from './profileHeader/BottomHeader';
import { toast } from 'react-toastify';
import Recomended from '../../components/Recomended';
import Following from './followersAndFollowingPage/Following';
import WishList from './wishlist/WishList';
import Footer from '../footerPage/Footer';
import VerifiedIcon from '@mui/icons-material/Verified';

function Profile(props) {
  const { userInfo } = useSelector((state) => state.user);

  const [user, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openSection, setOpenSections] = useState(
    localStorage.getItem('openSection') || 'overview'
  );
  const [previousSection, setPreviousSection] = useState('');
  const { payOpen, paySetOpen, shipOpen, shipSetOpen } = props;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/users/${userInfo?._id}`,

          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setUsers(data);

        setLoading(false);
      } catch (error) {
        toast.error('error', { toastId: 'unique-toast-id', autoClose: 500 });
        setLoading(false);
      }
    };

    fetchUser();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo === null ) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleSection = (section) => {
    setOpenSections(section || 'overview');
    setPreviousSection(openSection);
    localStorage.setItem('openSection', section);
  };

  useEffect(() => {
    if (payOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [payOpen]);

  useEffect(() => {
    if(loading === true ){
      const scrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
       document.body.style.height="20vh"

      return () => {
        window.history.scrollRestoration = scrollRestoration;
        document.body.style.height="auto"

      };
    }
  }, [loading]);

  return (
    <div className="profileBG pb-5 ">
      <div style={{ paddingTop: '80px' }} className="mb-4">
        <div
          className={shipOpen || payOpen ? "d-none  colBG shippingOpen1" : "d-none d-md-flex colBG shippingOpen"}
         
        >
          <NaviBar
            setOpenSections={setOpenSections}
            openSection={openSection}
            handleSection={handleSection}
          />
        </div>

        <div
          style={{ position: 'fixed', top: -10, width: '100vw', zIndex: '999' }}
          className=" d-md-none"
        >
          <ProfileHeader
            previousSection={previousSection}
            handleSection={handleSection}
            profileNav={true}
          />
        </div>

        <div
          className="d-none d-md-flex"
          style={{ marginBottom: '30px' }}
        ></div>

        <div
          style={{
            position: 'fixed',
            bottom: '0',
            width: '100vw',
            zIndex: '999',
          }}
          className=" d-md-none"
        >
          <BottomHeader />
        </div>
        <div className="profileBG " style={{ overFlow: 'hidden' }}>
          {loading ? (
            <div
              style={{ height: '60vh' }}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <LoadingBox />
            </div>
          ) : (
           <div>
             <Container>
              <div
                style={{ height: '50px' }}
                className="d-none d-md-flex gap-3 align-items-center"
              >
                <span>Home</span>
                <span>Account</span>
              </div>
              <Row>
                <Col md={3} className="colPro d-none d-md-flex">
                  <div>
                    <div className="colBG ">
                      <div className="p-3 ">
                        <strong className="">Account</strong>
                        <div className="d-flex gap- flex-column ">
                          <p
                            className={
                              openSection === 'overview'
                                ? 'sectionStyle mt-3 navHover'
                                : openSection === 'following'
                                ? 'sectionStyle mt-3'
                                : openSection === 'wishlist'
                                ? 'sectionStyle mt-3'
                                : 'navHover'
                            }
                            onClick={() => handleSection('overview')}
                          >
                            <Link className="text-decoration-none navHover text-black">
                              Overview{' '}
                            </Link>
                          </p>
                          <p
                            className={
                              openSection === 'order' ? 'sectionStyle  navHover' : 'navHover'
                            }
                            onClick={() => handleSection('order')}
                          >
                            <Link className="text-decoration-none  text-black">
                              Orders{' '}
                            </Link>
                          </p>
                          <p
                            className={
                              openSection === 'payment' ? 'sectionStyle' : ''
                            }
                            onClick={() => handleSection('payment')}
                          >
                            {' '}
                            <Link className="text-decoration-none  navHover text-black">
                              Payment{' '}
                            </Link>
                          </p>
                          <p
                            className={
                              openSection === 'refunds' ? 'sectionStyle' : ''
                            }
                            onClick={() => handleSection('refunds')}
                          >
                            <Link className="text-decoration-none navHover text-black">
                              Refunds and return{' '}
                            </Link>
                          </p>

                          <p
                            className={
                              openSection === 'settings' ? 'sectionStyle' : ''
                            }
                            onClick={() => handleSection('settings')}
                          >
                            <Link className="text-decoration-none  navHover text-black">
                              Settings{' '}
                            </Link>
                          </p>
                          <p
                            className={
                              openSection === 'shippingadd'
                                ? 'sectionStyle'
                                : ''
                            }
                            onClick={() => handleSection('shippingadd')}
                          >
                            <Link className="text-decoration-none  navHover text-black">
                              Shipping address{' '}
                            </Link>
                          </p>
                          <p
                            className={
                              openSection === 'wallet' ? 'sectionStyle' : ''
                            }
                            onClick={() => handleSection('wallet')}
                          >
                            <Link className="text-decoration-none navHover  text-black">
                              Wallet{' '}
                            </Link>
                          </p>
                          <p style={{opacity:"0.6"}}>Message center</p>
                          <p style={{opacity:"0.6"}}>Invite friends</p>
                          <p style={{opacity:"0.6"}}> Help center</p>
                          <p style={{opacity:"0.6"}}>Manage reports</p>
                          <p style={{opacity:"0.6"}}>Suggestion</p>
                          <p style={{opacity:"0.6"}}> DS Center</p>
                          {user?.isSeller ? (
                            <Link
                              className=" d-flex align-items-center gap-2 navHover  text-decoration-none "
                              to={`/seller/${userInfo?._id}`}
                              bg='primary'
                            >
                              Seller's Dashboard <VerifiedIcon/>
                            </Link>
                          ) : (
                            <Link
                            onClick={() =>paySetOpen(false)}
                              className="text-black navHover text-decoration-none "
                              to={`/user/seller/register/${userInfo?._id}`}
                            >
                              {' '}
                              Seller's Membership
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="colBG my-3">
                      <div className="d-flex flex-column align-items-center gap-2 p-3">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          AloServices Mobile App
                        </span>
                        <span style={{ fontSize: '12px', opacity: '0.6' }}>
                          Search Anywhere, Anytime
                        </span>
                        <img
                          style={{ width: '60%' }}
                          src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
                          alt=""
                        />
                        <span style={{ fontSize: '12px' }}>
                          Scan or click to download
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="">
                    <div>
                      {openSection === 'overview' && (
                        <OverView handleSection={handleSection} />
                      )}
                    </div>
                    <div>
                      {openSection === 'order' && (
                        <OrderCard
                          handleSection={handleSection}
                          openSection={openSection}
                        />
                      )}{' '}
                    </div>
                    <div>{openSection === 'orderDetails' && <Order />}</div>
                    <div>
                      {openSection === 'payment' && (
                        <AddPaymet paySetOpen={paySetOpen} payOpen={payOpen} />
                      )}
                    </div>
                    <div>{openSection === 'settings' && <Settings />}</div>
                    <div>
                      {openSection === 'shippingadd' && (
                        <ProfileShipping
                          shipOpen={shipOpen}
                          shipSetOpen={shipSetOpen}
                        />
                      )}
                    </div>
                    <div>
                      {openSection === 'refunds' && <RefundAndReturn />}
                    </div>
                    <div>{openSection === 'wallet' && <Wallet />}</div>
                    <div>{openSection === 'following' && <Following />}</div>
                    <div>{openSection === 'wishlist' && <WishList />}</div>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className='mt-4'>
        <Recomended />
      </div>
      <footer>
            <Footer />
          </footer>
           </div>
          )}
        </div>
      </div>
     
    </div>
  );
}

export default Profile;
