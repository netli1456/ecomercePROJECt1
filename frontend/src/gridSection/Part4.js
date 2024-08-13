import React from 'react'
import { Link } from 'react-router-dom'
import Cards from '../components/Cards'
import Card from 'react-bootstrap/Card'

function Part4(props) {
    const {productLowprice}=props
  return (
    <div>
        <Card style={{ height: '43vh' }} className="d-none d-md-block">
              <Card.Body className="d-flex flex-column  justify-content-center">
                <h5>
                  <strong>Weekly Deals</strong>
                </h5>
                <p className="topProduct">Low prices for 30 days</p>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  {productLowprice?.map((product) => (
                    <Link
                      to={`products/${product._id}`}
                      className="text-decoration-none text-black"
                      style={{ width: '23%' }}
                      key={product._id}
                    >
                      <Cards product={product} />

                      <strong className="weeklyDeal  px-2" style={{}}>
                        N{product.discountedPrice?.toFixed(2)}
                      </strong>
                      <p className="topProducts mt-1">
                        {product.countInStock} in stock
                      </p>
                    </Link>
                  ))}
                </div>
              </Card.Body>
            </Card>
    </div>
  )
}

export default Part4