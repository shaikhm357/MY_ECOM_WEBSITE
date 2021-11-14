import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3  rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body>
        <Card.Title as='div'>
          <div className='my-3'>
            <strong>{product.name}</strong>
          </div>
        </Card.Title>
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
