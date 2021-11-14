import React from "react";
import products from "../products";
import { Row } from "react-bootstrap";
import Product from "../components/Product";
const HomeScreen = () => {
  return (
    <>
      <h1>latest producs</h1>
      <Row sm={12} md={6} lg={4} xl={3}>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
