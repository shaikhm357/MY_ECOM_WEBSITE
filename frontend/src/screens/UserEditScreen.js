import React, { useEffect, useState } from 'react'
import { Form, Button, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Msg from '../components/Msg.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUser } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { Link } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants.js'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmint] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmint(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my=3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Msg variant="danger">{errorUpdate}</Msg>}
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

            <Form.Group controlId="email">
              <FormLabel>Email Address</FormLabel>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setIsAdmint(e.target.checked)}></Form.Check>
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

export default UserEditScreen
