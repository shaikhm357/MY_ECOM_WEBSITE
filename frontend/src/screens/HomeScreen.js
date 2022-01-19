import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
//import axios from "axios";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
    // const fetchProduct = async () => {
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // };
    // fetchProduct();
  }, [dispatch]);
  //const products = [];
  return (
    <>
      <h1>latest producs</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row sm={12} md={6} lg={4} xl={3}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
