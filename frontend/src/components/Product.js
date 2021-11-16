import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3  rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <div className='my-3'>
              <strong>{product.name}</strong>
            </div>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as='h3'>₹{Math.round(product.price * 72)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
