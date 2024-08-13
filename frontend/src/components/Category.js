import React from 'react';
import { Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ClearIcon from '@mui/icons-material/Clear';

function Category(props) {
  const { categories } = props;
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'white',
        position: 'relative',
      }}
      className="scrollbars p-3"
    >
      <div style={{ position: 'relative' }}>
        <span
          className="d-flex align-items-center gap-2"
          style={{
            position: 'sticky',
            top: '0',
            backgroundColor: 'white',
            height: '40px',
          }}
        >
          <ClearIcon />
          <strong>Categories</strong>
        </span>
        {categories?.slice(0, 23).map((category, index) => (
          <span className="d-flex align-items-center  gap-2" key={index}>
            <LocalHospitalIcon style={{ opacity: '0.1' }} />
            <Link 
              style={{
                fontSize: '14px',
                textDecoration: 'none',
                color: 'black',
              }}
              className='categor'
              to={`/search?category=${category}`}
            >
              {category}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Category;
