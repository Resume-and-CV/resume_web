import { render, fireEvent } from '@testing-library/react'
import LoginBox from '../LoginBox'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}))

test('renders login form by default', () => {
  const { getByLabelText } = render(<LoginBox />)
  expect(getByLabelText('userName')).toBeInTheDocument()
  expect(getByLabelText('password')).toBeInTheDocument()
})

test('displays error message when errorMessage prop is passed', () => {
  const { getByText } = render(<LoginBox errorMessage="Error message" />)
  expect(getByText('Error message')).toBeInTheDocument()
})

test('calls onLogin prop when form is submitted', () => {
  const onLogin = jest.fn()
  const { getByLabelText, getByRole } = render(<LoginBox onLogin={onLogin} />)

  fireEvent.change(getByLabelText('userName'), {
    target: { value: 'testuser' },
  })
  fireEvent.change(getByLabelText('password'), {
    target: { value: 'testpass' },
  })
  fireEvent.click(getByRole('button', { name: 'logIn' }))

  expect(onLogin).toHaveBeenCalledWith('testuser', 'testpass')
})

test('toggles password visibility when visibility button is clicked', () => {
  const { getByLabelText, getByRole } = render(<LoginBox />)
  const passwordInput = getByLabelText('password')

  // Check initial state
  expect(passwordInput.type).toBe('password')

  // Click to show password
  fireEvent.click(getByRole('button', { name: 'toggle visibility' }))
  expect(passwordInput.type).toBe('text')

  // Click to hide password
  fireEvent.click(getByRole('button', { name: 'toggle visibility' }))
  expect(passwordInput.type).toBe('password')
})

test('does render when isVisible is false', () => {
  const { queryByLabelText } = render(<LoginBox isVisible={false} />)
  expect(queryByLabelText('userName')).toBeInTheDocument()
  expect(queryByLabelText('password')).toBeInTheDocument()
})
test('does not render when isVisible is true', () => {
  const { queryByLabelText } = render(<LoginBox isVisible={true} />)
  expect(queryByLabelText('userName')).not.toBeInTheDocument()
  expect(queryByLabelText('password')).not.toBeInTheDocument()
})

test('updates username and password fields when typed into', () => {
  const { getByLabelText } = render(<LoginBox />)

  fireEvent.change(getByLabelText('userName'), {
    target: { value: 'testuser' },
  })
  fireEvent.change(getByLabelText('password'), {
    target: { value: 'testpass' },
  })

  expect(getByLabelText('userName').value).toBe('testuser')
  expect(getByLabelText('password').value).toBe('testpass')
})
