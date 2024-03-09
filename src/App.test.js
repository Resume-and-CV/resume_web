import { render, screen } from '@testing-library/react'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18n from './middleWare/i18n' // your i18n config file

test('renders login page on root path', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  )
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
})
