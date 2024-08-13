import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function Part1(props) {
    const {categories} = props
  return (
    <Card style={{ height: '79vh', overflowY: 'scroll' }} className='scrollbars'>
              <Card.Body style={{ position: 'relative' }}>
                <span
                  className="d-flex align-items-center gap-2"
                  style={{
                    position: 'sticky',
                    top: '0',
                    backgroundColor: 'white',
                    height: '40px',
                  }}
                >
                  <ListIcon />
                  <strong>Categories</strong>
                </span>
                {categories?.map((category, index) => (
                  <span className="d-flex align-items-center gap-2"  key={index}>
                    <LocalHospitalIcon style={{opacity:"0.1"}}/>
                    <Link to={`/search?category=${category}`}
                      style={{
                        fontSize: '14px',
                        textDecoration: 'none',
                        color: 'black',
                      }}
                     
                    >
                      {category}
                    </Link>
                  </span>
                ))}
              </Card.Body>
            </Card>
  )
}

export default Part1