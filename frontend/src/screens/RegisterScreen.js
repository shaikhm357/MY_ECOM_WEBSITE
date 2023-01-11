import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Msg from '../components/Msg.js'
import Loader from '../components/Loader.js'
import { register } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

function RegisterScreen({ location, history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
    //dispatch register
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      
      {message && <Msg variant="danger">{message}</Msg>}
      {error && <Msg variant="danger">{error}</Msg>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <FormLabel>name</FormLabel>
          <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <FormLabel>Email Address</FormLabel>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <FormLabel>Password </FormLabel>
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirm password">
          <FormLabel>Confirm Password</FormLabel>
          <Form.Control
            type="Passwod"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
