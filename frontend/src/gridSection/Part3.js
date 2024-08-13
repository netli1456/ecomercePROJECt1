import React from 'react'
import { Link } from 'react-router-dom'
import Cards from '../components/Cards'
import Card from 'react-bootstrap/Card'

function Part3(props) {
    const {productHighDiscountprice}=props
  return (
    <div>
            <Card style={{ height: '43vh' }} className="d-none d-md-block">
              <Card.Body className="d-flex flex-column  justify-content-center">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>
                    <strong>Exclusive seller codes</strong>
                  </h5>
                  <span
                    style={{ opacity: '0.7' }}
                    className="d-flex flex-column"
                  >
                    <span> 50% Off </span>
                    <Link className="mb-2 text-black">view more</Link>
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  {productHighDiscountprice?.map((product) => (
                    <Link
                      to={`products/${product._id}`}
                      style={{ width: '32%', textDecoration: 'none' }}
                      key={product._id}
                    >
                      <Cards product={product} />
                      <strong className="cards-containers px-2" style={{}}>
                        N{product.discountedPrice}
                      </strong>
                      <p className="topProduc mt-1">with code</p>
                    </Link>
                  ))}
                </div>
              </Card.Body>
            </Card>
    </div>
  )
}

export default Part3