import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button, Col, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Msg from '../components/Msg.js'
import Loader from '../components/Loader.js'
import { getUserDetails } from '../actions/userActions.js'

function ProfileScreen({ location, history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  console.log('user', user)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passwords do not match')
    } else {
      //dispatch updare profile
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
