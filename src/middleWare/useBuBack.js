import { useNavigate } from 'react-router-dom'

export const useBuBack = () => {
  const navigate = useNavigate()

  const back = () => {
    navigate(-1)
  }

  return back
}
