import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ComputerIcon from '@mui/icons-material/Computer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DeckIcon from '@mui/icons-material/Deck';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';

function Navigation(props) {
  const { filter, handleFiteredPage } = props;

  return (
    <div>
      <div className="d-flex align-items-center flex-wrap justify-content-between">
        <div
          onClick={() => handleFiteredPage(null)}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={filter === null ? 'navButtonActive' : ''}
          >
            <WidgetsIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === null ? 'navButtonActive1 text-center' : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            All categories
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('lowprice')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={
              filter === 'lowprice' ? 'navButtonActive text-center' : ''
            }
          >
            <EngineeringIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'lowprice'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Consumer Economics
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('phones')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px', cursor: 'pointer' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={
              filter === 'phones'
                ? 'navButtonActive text-center'
                : 'text-center'
            }
          >
            <PhoneIphoneIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'phones'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Phones & Technology
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('computer')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={
              filter === 'computer'
                ? 'navButtonActive text-center'
                : ' text-center'
            }
          >
            <ComputerIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'computer'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Computer & Office
          </span>
        </div>
        <div
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
          onClick={() => handleFiteredPage('sports')}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={filter === 'sports' ? 'navButtonActive text-center' : ''}
          >
            <SportsBasketballIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'sports'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Sports & Entertainment
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('homeandgarden')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={
              filter === 'homeandgarden' ? 'navButtonActive text-center' : ''
            }
          >
            <DeckIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'homeandgarden'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Home & Garden
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('parts')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={filter === 'parts' ? 'navButtonActive text-center' : ''}
          >
            <ElectricCarIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={
              filter === 'parts'
                ? 'navButtonActive1 text-center'
                : 'text-center'
            }
            style={{ fontSize: '11px' }}
          >
            Automobile Parts
          </span>
        </div>
        <div
          onClick={() => handleFiteredPage('toys')}
          className={
            'd-flex align-items-center flex-column justify-content-center'
          }
          style={{ width: '80px', height: '100px' }}
        >
          <span
            style={{
              backgroundColor: 'orange',
              borderRadius: '50%',
              padding: '5px',
            }}
            className={filter === 'toys' ? 'navButtonActive' : ''}
          >
            <SnowboardingIcon
              style={{ width: '40px', height: '40px', color: 'whitesmoke' }}
            />
          </span>
          <span
            className={filter === 'toys' ? 'navButtonActive1' : 'text-center'}
            style={{ fontSize: '11px' }}
          >
            Toys & Hobbies
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
