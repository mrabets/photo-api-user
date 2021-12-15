import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../store/store'

export function useAuth() {
  const {id, email, token} = useSelector((state: RootState) => state.user)

  return {
    isAuth: !!token,
    id,
    email,
    token
  }
}