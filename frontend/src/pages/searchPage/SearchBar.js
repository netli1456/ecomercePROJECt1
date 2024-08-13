import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const { query, setQuery, setIsClicked } = props;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length >= 1) {
      navigate(`/test/search/?query=${query}`);
      console.log('query submited');
      setIsClicked(true);
    } else {
      navigate('/search');
      console.log('please enter query');
    }
  };

  const location = useLocation();

  const handleNavigateBar = () => {
  
    if (location.pathname !== '/test/search' ) {
      navigate('/test/search');
    }

    }
  

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <Form
        onFocus={handleNavigateBar}
        onSubmit={handleSearch}
        className="d-flex align-items-center"
      >
        <div
          className="d-flex d-md-none align-items-center mb-2 "
          style={{ width: '100%' }}
        >
          <InputGroup
            style={{ borderRadius: ' 20px ', width: '100%' }}
            size="sm"
            className="d-flex serchsmallBg1  bgbor "
          >
            <Form.Control
              style={{ height: '100%' }}
              aria-label="Small"
              type="text"
              name="q"
              id="q"
              aria-describedby="button-search"
              placeholder="search products..."
              className="serchsmallBg bgbor"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="lighter"
              id="button-search"
              type="submit"
              style={{ height: '100%', backgroundColor: 'orange' }}
              className="d-flex align-items-center  iconSearchBorder "
            >
              <SearchOutlinedIcon className="largeSearcIcon text-white" />
            </Button>
          </InputGroup>
        </div>

        <div className="largeSearch m-1 d-md-flex d-none">
          <InputGroup size="lg" className="" style={{ height: '100%' }}>
            <Form.Control
              style={{ height: '100%' }}
              aria-label="Small"
              type="text"
              name="q"
              id="q"
              aria-describedby="button-search"
              placeholder="search products..."
              className="bagroundSearch"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="lighter"
              id="button-search"
              type="submit"
              style={{ height: '100%', backgroundColor: 'orange' }}
              className="d-flex align-items-center "
            >
              <SearchOutlinedIcon className="largeSearcIcon text-white" />
            </Button>{' '}
          </InputGroup>
        </div>
      </Form>
    </div>
  );
}

export default SearchBar;
