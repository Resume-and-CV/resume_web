import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  getByRole,
  act,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'

jest.mock('axios', () => {
  return {
    post: jest.fn(() =>
      Promise.resolve({ data: { token: 'fake-token' }, status: 200 }),
    ),
  }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}))

const axios = require('axios')

describe('LoginPage', () => {
  it('renders loginBox form by default', () => {
    const { getByRole } = render(<LoginPage />, { wrapper: MemoryRouter })
    expect(getByRole('button', { name: 'logIn' })).toBeInTheDocument()
  })

  it('toggles to contactForm when button is clicked', () => {
    const { getByText, getByRole } = render(<LoginPage />, {
      wrapper: MemoryRouter,
    })
    fireEvent.click(getByText('contactForm'))
    expect(getByRole('button', { name: 'accountRequest' })).toBeInTheDocument()
  })

  it('toggles back to loginBox form when button is clicked', () => {
    const { getByText, getByRole } = render(<LoginPage />, {
      wrapper: MemoryRouter,
    })

    // Switch to ContactForm
    fireEvent.click(getByText('contactForm'))
    expect(getByRole('button', { name: 'accountRequest' })).toBeInTheDocument()

    // Switch back to login form
    fireEvent.click(getByText('back'))
    expect(getByRole('button', { name: 'logIn' })).toBeInTheDocument()
  })

  it('handles login when form is submitted', async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: 'fake-token' },
      status: 200,
    })

    const { getByLabelText, getByRole } = render(<LoginPage />, {
      wrapper: MemoryRouter,
    })
    await act(async () => {
      fireEvent.input(getByLabelText('userName'), {
        target: { value: 'testuser' },
      })
      fireEvent.input(getByLabelText('password'), {
        target: { value: 'testpass' },
      })
      fireEvent.click(getByRole('button', { name: 'logIn' }))
    })

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { username: 'testuser', password: 'testpass' },
      ),
    )
  })
  // Add more tests as needed for other functionality
})
