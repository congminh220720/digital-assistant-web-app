import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import { setUserToken } from '_utils/localData'
import authApi from '_api/auth'
import * as Yup from 'yup'

import 'react-toastify/dist/ReactToastify.css'

const schema = Yup.object().shape({
  name: Yup.string().required('Invalid name'),
  password: Yup.string().required('Invalid password'),
  confirmPassword: Yup.string().required('Invalid Confirm password'),
  email: Yup.string().email().required('Invalid email'),
})

function ModalCreateAccount({ show, toggleModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const onSubmit = async data => {
    try {
      if (data.password === data.confirmPassword) {
        const infoUser = {
          name: data.name,
          password: data.password,
          email: data.email,
        }
        const res = await authApi.createAccount(infoUser)
        setUserToken(res.msgResp.token)
        navigate('/')
      } else {
        toast.warn('Invalid confirm password')
      }
    } catch (error) {}
  }

  return (
    <div>
      <ToastContainer />
      <Modal show={show} onHide={toggleModal} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Create new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='name@example.com' {...register('email')} />
              {errors.email ? <span style={{ color: 'red' }}>{errors.email.message}</span> : ''}
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Normal text' {...register('name')} />
              {errors.name ? <span style={{ color: 'red' }}>{errors.name.message}</span> : ''}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' {...register('password')} />
              {errors.password ? <span style={{ color: 'red' }}>{errors.password.message}</span> : ''}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>type password again</Form.Label>
              <Form.Control type='password' placeholder='Password' {...register('confirmPassword')} />
              {errors.confirmPassword ? <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span> : ''}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreateAccount
