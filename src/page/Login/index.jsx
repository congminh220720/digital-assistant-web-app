import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authApi from '_api/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import googleIcon from '../../assets/img/icon btn/googleIcon.png'
import firebase, { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import { setUserToken, getUserToken } from '_utils/localData'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'

import ModalCreateAccount from './components/ModalCreateAccount'

import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

const schema = Yup.object().shape({
  password: Yup.string().required('Invalid password'),
  email: Yup.string().email().required('Invalid email'),
})

const ggProvider = new firebase.auth.GoogleAuthProvider()

function Login(props) {
  const [show, setShow] = useState(false)

  const toggleModal = () => {
    setShow(!show)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const handleLoginWithGoogle = async () => {
    const { additionalUserInfo } = await auth.signInWithPopup(ggProvider)
    const emailUser = {
      email: additionalUserInfo.profile.email,
    }

    console.log(emailUser)
    if (additionalUserInfo.isNewUser) {
      try {
        const infoUser = {
          email: additionalUserInfo.profile.email,
          name: additionalUserInfo.profile.name,
          photoUrl: additionalUserInfo.profile.picture,
        }
        const res = await authApi.createAccount(infoUser)
        setUserToken(res.msgResp.token)
        navigate('/')
      } catch (error) {}
    } else {
      try {
        const res = await authApi.login(emailUser)
        setUserToken(res.msgResp.token)
        navigate('/')
      } catch (error) {}
    }
  }

  const handleLogin = async info => {
    try {
      const data = {
        email: info.email,
        password: info.password,
      }
      const res = await authApi.login(data)
      setUserToken(res.msgResp.token)
      navigate('/')
    } catch (error) {
      toast.error('Email / password is invalid')
    }
  }

  useEffect(() => {
    const isCheckToken = getUserToken()
    if (isCheckToken) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <ToastContainer />
      <div className='login__page' data-testid='login'>
        <div className='login__page-layout'>
          <p>Digital-Assistant</p>
          <Form className='login__page-form'>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Control type='email' placeholder='Email address' {...register('email')} />
              {errors.email ? <span style={{ color: 'red', float: 'left' }}>{errors.email.message}</span> : ''}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' placeholder='Password' {...register('password')} />
              {errors.password ? <span style={{ color: 'red', float: 'left' }}>{errors.password.message}</span> : ''}
            </Form.Group>
            <button className='login__page-form-btn' onClick={handleSubmit(handleLogin)}>
              Login
            </button>
          </Form>

          <div className='login__page-btn'>
            <button className='login__page-btn-google' onClick={handleLoginWithGoogle}>
              <img src={googleIcon} alt='' />
              <span>Login with Google</span>
            </button>
            <button className='login__page-btn-new-account' onClick={toggleModal}>
              Create new account
            </button>
          </div>
        </div>
        <ModalCreateAccount show={show} toggleModal={toggleModal} />
      </div>
    </>
  )
}

export default Login
