import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  getByRole,
  act,
  screen,
} from '@testing-library/react'
import { BrowserRouter, useNavigate, MemoryRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'en',
    },
  }),
}))

describe('LoginPage', () => {
  test('renders LoginPage component', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    )
    // Check that the login form is rendered
    expect(
      screen.getByRole('heading', { level: 2, name: 'logIn' }),
    ).toBeInTheDocument() // Check that the username and password fields are rendered
    expect(screen.getByLabelText('userName')).toBeInTheDocument()
    expect(screen.getByLabelText('password')).toBeInTheDocument()

    // Check that the login button is rendered
    expect(screen.getByRole('button', { name: 'logIn' })).toBeInTheDocument()
  })

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

  it('test accountRequest submitted', async () => {
    axios.post.mockClear()
    axios.post.mockResolvedValue({ data: {} })

    const { getByPlaceholderText, getByRole, getByText } = render(
      <LoginPage />,
      {
        wrapper: MemoryRouter,
      },
    )

    fireEvent.click(getByText('contactForm'))

    fireEvent.change(getByPlaceholderText('yourEmail'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(getByPlaceholderText('subject'), {
      target: { value: 'testSubject' },
    })
    fireEvent.change(getByPlaceholderText('message'), {
      target: { value: 'testText' },
    })

    fireEvent.click(getByRole('button', { name: 'accountRequest' }))

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/email/send-request`,
        {
          from: 'test@example.com',
          subject: 'testSubject',
          text: 'testText',
        },
      ),
    )
  })

  it('displays error message when login fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    })

    const { getByLabelText, getByRole, findByText } = render(<LoginPage />, {
      wrapper: MemoryRouter,
    })
    await act(async () => {
      fireEvent.input(getByLabelText('userName'), {
        target: { value: 'testuser' },
      })
      fireEvent.input(getByLabelText('password'), {
        target: { value: 'wrongpass' },
      })
      fireEvent.click(getByRole('button', { name: 'logIn' }))
    })

    expect(await findByText('Invalid credentials')).toBeInTheDocument()
  })
})
