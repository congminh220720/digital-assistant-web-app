import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../index'
import { render } from '@testing-library/react'

it('render with login', () => {
  const { getByText, getByTestId, container } = render(<Login />)
  const elementLogin = getByTestId('login')
  expect(elementLogin.innerHTML).toHaveTextContent('Digital-Assistant')
})
