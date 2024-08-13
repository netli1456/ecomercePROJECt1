import React from 'react';
import Button from 'react-bootstrap/esm/Button';

function YesOrNo(props) {
  const { comfirm, product, setComfirm, userInfo, handleDelete } = props;
  return (
    <div style={{width:"100%", height:"100%", backgroundColor:"black", zIndex:"999"}}>
      <div
        className="p-3 text-center"
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          border: '1px solid black',
          width: 'fit-content',
          margin: 'auto',
        }}
      >
        <strong>Are you sure you want to delete this item?</strong>
        <div
          className="d-flex mt-2 align-items-center justify-content-between"
          style={{ width: '50%', margin: 'auto' }}
        >
          <Button
            onClick={() => setComfirm(false)}
            variant="lighter"
            className="suspend"
          >
            No
          </Button>
          <Button
            onClick={() => handleDelete(userInfo._id, product._id)}
            variant="lighter"
            className="delete"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YesOrNo;
