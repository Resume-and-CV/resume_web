import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../ContactForm'

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
