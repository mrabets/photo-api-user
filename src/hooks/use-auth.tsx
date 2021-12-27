import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../store/store'

export function useAuth() {
  const {user_id, email, token} = useSelector((state: RootState) => state.user)

  return {
    isAuth: !!token,
    user_id,
    email,
    token
  }
}