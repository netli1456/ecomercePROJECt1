import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useSelector } from 'react-redux';
import NowOrderCard from './NowOrderCard';
import { apiUrl } from '../../utils/ApiConfig';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Badge from 'react-bootstrap/esm/Badge';
// Create a component to display individual orders



function OrderSectionSelector() {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(null); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/orders/${userInfo?._id}/allordersNow`
        );
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [userInfo?._id]);




  const testArraySep = orders?.map((object) => object);

  const singleArray = testArraySep?.map((item) => {
    const orderId = item?._id;
    const itemsOrdered = item.orderItems.slice(0, 1).map((items) => items);
    const shippingFee = item.shippingFee;
    const totalItems = item.subTotal;
    const userId = item.userId;
    const orderDate = item.createdAt;
    const isPaid = item.isPaid;
    const user = item.user;

    return {
      itemsOrdered: itemsOrdered,
      shippingFee: shippingFee,
      totalItems: totalItems,
      orderId: orderId,
      user: user,
      userId: userId,
      orderDate: orderDate,
      isPaid: isPaid,
    };
  });



  const filterOrders = (sectionKey, userOrders) => {
    switch (sectionKey) {
      case 'paid':
        return userOrders.filter((order) => order.isPaid);
      case 'awaitingPayment':
        return userOrders.filter((order) => !order.isPaid);
      case 'shipped':
        return userOrders.filter((order) => order.isShipped);
      case 'delivered':
        return userOrders.filter((order) => order.isDelivered);
      default:
        return [];
    }
  };

  return (
    
    <div>
      
      
      <div className="d-flex align-items-center justify-content-around py-3">
              <div style={{cursor:"pointer"}} onClick={()=>setFilter('awaitingPayment')} className="d-flex flex-column gap-3 align-items-center">
                <span >
                  <PaidIcon
                    style={{ width: '35px', height: '35px' }}
                    className="iconColor"
                  />
                </span>
                <span style={{position:"relative"}} className={filter === "awaitingPayment" ? "d-none d-md-flex headerBottomLocation1" : "d-none d-md-flex"}>Unpaid 
                   <div style={{position:"absolute", top:-15, right:-22}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('awaitingPayment', singleArray).length > 0 && filterOrders('awaitingPayment', singleArray).length}</Badge></div>
               </span>
                <span style={{ fontSize: '13px', position:"relative" }} className={filter === "awaitingPayment" ? "headerBottomLocation1 d-md-none" : " d-md-none"}>
                  Unpaid <div style={{position:"absolute", top:-15, right:-10}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('awaitingPayment', singleArray).length > 0 && filterOrders('awaitingPayment', singleArray).length}</Badge></div>
                </span>
              </div>
              <div style={{cursor:"pointer"}} onClick={()=>setFilter('paid')} className={filter === 'paid' ? "d-flex flex-column gap-3 align-items-center " :"d-flex flex-column gap-3 align-items-center"}>
                <span  >
                  <FmdGoodIcon
                    className="iconColor"
                    style={{ width: '35px', height: '35px' }}
                  />
                </span>
                <span style={{position:"relative"}} className={ filter === 'paid' ? "d-none d-md-flex headerBottomLocation1": "d-none d-md-flex"}>To be shipped <div style={{position:"absolute", top:-15, right:-18}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('paid', singleArray).length > 0 && filterOrders('paid', singleArray).length}</Badge></div></span>
                <span style={{ fontSize: '13px', position:"relative"}} className={filter === "paid" ? " d-md-none headerBottomLocation1" : " d-md-none"}>
                  To be shipped  <div style={{position:"absolute", top:-15, right:-10}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('paid', singleArray).length > 0 && filterOrders('paid', singleArray).length}</Badge></div>
                </span>
              </div>
              <div style={{cursor:"pointer"}} onClick={()=>setFilter('shiped')} className="d-flex flex-column gap-3 align-items-center">
                <span>
                  <LocalShippingIcon
                    className="iconColor"
                    style={{ width: '35px', height: '35px' }}
                  />
                </span>
                <span style={{position:"relative"}} className={ filter === 'shiped' ? "d-none d-md-flex headerBottomLocation1": "d-none d-md-flex"}>Shipped <div style={{position:"absolute", top:-15, right:-20, }}> <Badge  style={{borderRadius:"20px"}} bg="danger">{filterOrders('shiped', singleArray).length > 0 && filterOrders('shiped', singleArray)?.length}</Badge></div></span>
                <span style={{ fontSize: '13px', position:"relative" }} className={ filter === 'shiped' ? " d-md-none headerBottomLocation1": " d-md-none"}>
                  Shipped <div style={{position:"absolute", top:-15, right:-10}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('shiped', singleArray).length > 0 && filterOrders('shiped', singleArray).length}</Badge></div>
                </span>
              </div>
              <div style={{cursor:"pointer"}} onClick={()=>setFilter('delivered')} className="d-flex flex-column gap-3 align-items-center">
                <span>
                  <GppGoodIcon
                    className="iconColor"
                    style={{ width: '35px', height: '35px' }}
                  />
                </span>
                <span style={{position:"relative"}} className={ filter === 'delivered' ? "d-none d-md-flex headerBottomLocation1": "d-none d-md-flex"}>To be reviewed <div style={{position:"absolute", top:-15, right:-22}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('delivered', singleArray).length >0 && filterOrders('delivered', singleArray).length}</Badge></div></span>
                <span style={{ fontSize: '13px', position:"relative" }} className={ filter === 'delivered' ? " d-md-none headerBottomLocation1": " d-md-none"}>
                  To be reviewed <div style={{position:"absolute", top:-15, right:-10}}> <Badge style={{borderRadius:"20px"}} bg="danger">{filterOrders('delivered', singleArray).length > 0 && filterOrders('delivered', singleArray).length}</Badge></div>
                </span>
              </div>
            </div>
      <div >
        {filterOrders(filter, singleArray).map((order) => (
          <NowOrderCard key={order?._id} order={order} />
        ))}
      </div>
      
    </div>
  );
}

export default OrderSectionSelector;
