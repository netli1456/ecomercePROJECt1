import './App.css';
import NaviBar from './navSection/NaviBar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/authPage/signupSection/SignIn';
import HomeScreen from './pages/homepage/HomeScreen';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from './utils/ApiConfig';
import Product from './pages/singleProductPage/Product';
import Profile from './pages/userProfileSection/Profile';
import IsellerRegister from './pages/userProfileSection/IsellerRegister';
import UserSellerStore from './pages/userProfileSection/UserSellerStore';
import SignUp from './pages/authPage/signinSection/SignUp';
import Cartscreen from './pages/cartPage/Cartscreen';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Shipping from './pages/shippingAddress/Shipping';
import Payment from './pages/paymentSetion/Payment';
import Order from './pages/orderpage/Order';
import OrderCard from './components/OrderCard';
import { ToastContainer } from 'react-toastify';

import AddNewCard from './pages/userProfileSection/paymentpage/AddNewCard';
import UpdateShipping from './pages/shippingAddress/UpdateShipping';
import PersonalInfo from './pages/userProfileSection/personalInfo/PersonalInfo';
import Test from './components/Test';
import Footer from './pages/footerPage/Footer';
import BottomHeader from './pages/userProfileSection/profileHeader/BottomHeader';
import OrderSectionSelector from './pages/orderpage/OrderSectionSelector';
import Filter from './components/Filter';
import SearchScreen from './pages/searchPage/SearchScreen';
import EditProfileInfo from './pages/userProfileSection/personalInfo/EditProfileInfo';

function App() {
  const [open, setOpen] = useState(false);
  const [payOpen, paySetOpen] = useState(false);
  const [shipOpen, shipSetOpen] = useState(false);
  const [loadingApp, setLoadingApp] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const [random, setRandom] = useState([]);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/random`);

        setRandom(data.randomProducts);
        setLoadingApp(false);
      } catch (error) {
        console.error(error);
        setLoadingApp(false);
      }
    };
    fetchRandom();
  }, []);

 

 
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" style={{ bottom: '70px' }} />

      <div className={payOpen ? 'addpayment1 bodyContainer' : 'bodyContainer'}>
     
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
        <div>
          <div className={payOpen ? 'addpayment' : ''}>
            {' '}
            {payOpen && (
              <AddNewCard paySetOpen={paySetOpen} payOpen={payOpen} />
            )}
          </div>
          {shipOpen && (
            <div
              className="d-flex flex-column justify-content-center align-items-center cartOpacity"
              style={{
                position: 'absolute',
                top: 0,
                width: '100vw',
                height: '100vh',
              }}
            >
              <UpdateShipping shipOpen={shipOpen} shipSetOpen={shipSetOpen} />
            </div>
          )}
          {shipOpen && (
            <div
              className="d-flex flex-column justify-content-center align-items-center cartOpacity"
              style={{
                position: 'absolute',
                top: 0,
                width: '100vw',
                height: '100vh',
              }}
            >
              <Shipping shipOpen={shipOpen} shipSetOpen={shipSetOpen} />
            </div>
          )}
        </div>

        <main className="theMain">
          <Routes>
            <Route path="/" element={<HomeScreen random={random} />} />
            <Route
              path="/test2"
              element={<OrderSectionSelector random={random} />}
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/search" element={<SearchScreen />} />

            <Route
              path="/user/profile/:id"
              element={
                <Profile
                  shipOpen={shipOpen}
                  shipSetOpen={shipSetOpen}
                  paySetOpen={paySetOpen}
                  payOpen={payOpen}
                />
              }
            />
            <Route
              path="/user/seller/register/:id"
              element={<IsellerRegister />}
            />
            <Route path="/edit/profile/:id" element={<EditProfileInfo />} />
            <Route path="/seller/:userId" element={<UserSellerStore />} />
            <Route path="/products/cart" element={<Cartscreen />} />

            <Route path="/products/shipping" element={<PlaceOrder />} />
            <Route
              path="/products/:id"
              element={<Product setLoadingApp={setLoadingApp} />}
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/user/orders" element={<OrderCard />} />
            <Route path="/user/personalinfo" element={<PersonalInfo />} />

            <Route path="/test/search" element={<Test />} />
            <Route
              path="/fsjgiksuj"
              element={
                <NaviBar
                open={open}
                random={random}
                setRandom={setRandom}
                setOpen={setOpen}
              
              />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
