
import { Navigate } from "react-router-dom";
import { useStateValue } from "../Context/appContext";
export const authorizeUser = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token) return <Navigate to={'/'} replace="true"></Navigate>

    return children
}

export const ProtectedRoute = ({children}) => {
    const {
      state: { username },
    } = useStateValue();

    if(!username) return <Navigate to={"/"} replace="true"></Navigate>;
    return children

}