import { useSelector } from "react-redux";

export function useAuth() {
  const {id, email, token} = useSelector(state => state.user)

  return {
    isAuth: !!token,
    id,
    email,
    token
  }
}