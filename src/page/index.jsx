import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRouter from '../components/ProtectedRouter'
import Home from './Home'
import Login from './Login'
import Main from './Main'

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRouter children={<Main />} />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
