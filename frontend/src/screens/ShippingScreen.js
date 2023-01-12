import React, { useState } from 'react'
import { Form, Button, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { saveShippingAddress } from '../actions/cartAction.js'

function ShoppingScreen({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <FormLabel>Address</FormLabel>
          <Form.Control type="text" placeholder="Enter address" required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <FormLabel>City</FormLabel>
          <Form.Control type="text" placeholder="Enter City" value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <FormLabel>Postal Code</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <FormLabel>country</FormLabel>
          <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShoppingScreen
