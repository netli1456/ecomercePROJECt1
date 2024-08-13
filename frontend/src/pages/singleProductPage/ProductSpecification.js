import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

function ProductSpecification(props) {
  const { specification } = props;
  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div className="d-flex gap-5 align-items-center  ">
            <div
              style={{ width: '100%', backgroundColor: 'rgb(242, 239, 239) ' }}
              className="text-center p-3 text-capitalize"
            >
              {specification?.title}
            </div>
            <div className='text-capitalize' style={{ width: '100%',}}>{specification?.description}</div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ProductSpecification;
