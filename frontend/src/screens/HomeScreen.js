import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProduct();
  }, []);
  return (
    <>
      <h1>latest producs</h1>
      <Row sm={12} md={6} lg={4} xl={3}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
