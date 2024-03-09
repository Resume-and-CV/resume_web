import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../ContactForm'
// ContactForm.test.js

// Mock the react-i18next module
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}))

test('submits the form with email, subject, and text', async () => {
  const onAccountRequest = jest.fn()
  const { getByPlaceholderText, getByRole } = render(
    <ContactForm onAccountRequest={onAccountRequest} isVisible={true} />,
  )

  fireEvent.change(getByPlaceholderText('yourEmail'), {
    target: { value: 'test@example.com' },
  })
  fireEvent.change(getByPlaceholderText('subject'), {
    target: { value: 'Test Subject' },
  })
  fireEvent.change(getByPlaceholderText('message'), {
    target: { value: 'Test Message' },
  })

  fireEvent.click(getByRole('button'))

  await waitFor(() =>
    expect(onAccountRequest).toHaveBeenCalledWith(
      'test@example.com',
      'Test Subject',
      'Test Message',
    ),
  )
})

test('shows an error message when fields are empty and form is submitted', async () => {
  const onAccountRequest = jest.fn()
  const { getByRole, getByText } = render(
    <ContactForm onAccountRequest={onAccountRequest} isVisible={true} />,
  )

  fireEvent.click(getByRole('button'))

  await waitFor(() =>
    expect(getByText('All fields are required.')).toBeInTheDocument(),
  )
})

test('shows loading state when isLoading is true', () => {
  const { getByText } = render(
    <ContactForm isLoading={true} isVisible={true} />,
  )
  expect(getByText('sending')).toBeInTheDocument()
})

test('shows success message when request is successful', () => {
  const { getByText } = render(
    <ContactForm requestSuccessMessage="Request successful" isVisible={true} />,
  )
  expect(getByText('Request successful')).toBeInTheDocument()
})

test('shows error message when request fails', () => {
  const { getByText } = render(
    <ContactForm requestErrorMessage="Request failed" isVisible={true} />,
  )
  expect(getByText('Request failed')).toBeInTheDocument()
})

test('resets form fields after successful request', async () => {
  const onAccountRequest = jest.fn()
  const { getByPlaceholderText, getByRole, rerender } = render(
    <ContactForm onAccountRequest={onAccountRequest} isVisible={true} />,
  )

  fireEvent.change(getByPlaceholderText('yourEmail'), {
    target: { value: 'test@example.com' },
  })
  fireEvent.change(getByPlaceholderText('subject'), {
    target: { value: 'Test Subject' },
  })
  fireEvent.change(getByPlaceholderText('message'), {
    target: { value: 'Test Message' },
  })

  fireEvent.click(getByRole('button'))

  // Simulate successful request
  rerender(
    <ContactForm
      onAccountRequest={onAccountRequest}
      isVisible={true}
      requestSuccessMessage="Request successful"
    />,
  )

  await waitFor(() => {
    expect(getByPlaceholderText('yourEmail').value).toBe('')
    expect(getByPlaceholderText('subject').value).toBe('')
    expect(getByPlaceholderText('message').value).toBe('')
  })
})

test('renders when isVisible is true', () => {
  const { queryByPlaceholderText } = render(<ContactForm isVisible={true} />)
  expect(queryByPlaceholderText('yourEmail')).toBeInTheDocument()
  expect(queryByPlaceholderText('subject')).toBeInTheDocument()
})

test('does not render when isVisible is false', () => {
  const { queryByPlaceholderText } = render(<ContactForm isVisible={false} />)
  expect(queryByPlaceholderText('yourEmail')).not.toBeInTheDocument()
  expect(queryByPlaceholderText('subject')).not.toBeInTheDocument()
})
