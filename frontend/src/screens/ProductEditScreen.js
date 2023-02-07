import React, { useEffect, useState } from 'react'
import { Form, Button, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Msg from '../components/Msg.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, history, product, productId])

  const submitHandler = (e) => {
    e.preventDefault()
    //update product
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my=3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Msg varaint="danger">{error}</Msg>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <FormLabel>name</FormLabel>
              <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <FormLabel>price</FormLabel>
              <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <FormLabel>image</FormLabel>
              <Form.Control type="text" placeholder="Enter Image" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <FormLabel>brand</FormLabel>
              <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <FormLabel>countInStock</FormLabel>
              <Form.Control
                type="number"
                placeholder="Enter CountInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <FormLabel>category</FormLabel>
              <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <FormLabel>description</FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br />
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
