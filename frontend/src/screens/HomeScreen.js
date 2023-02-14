import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import Product from '../components/Product'
import Msg from '../components/Msg'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

//import axios from "axios";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    // const fetchProduct = async () => {
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // };
    // fetchProduct();
  }, [dispatch, keyword, pageNumber])
  //const products = [];
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          GO Back
        </Link>
      )}
      <h1>latest producs</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Msg variant="danger">{error}</Msg>
      ) : (
        <>
          <Row sm={12} md={6} lg={4} xl={3}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
          <Paginate pages={pages} page={page} key={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}

export default HomeScreen
