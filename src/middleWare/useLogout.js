import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    toast('You have been logged out.')
    console.log('Logged out')
  }

  return logout
}
