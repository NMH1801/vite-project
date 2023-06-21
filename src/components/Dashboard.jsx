import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice";

export const Dashboard =() => {
    const dispatch = useDispatch();
    return(
        <>
        <h1>Đăng nhập thành công</h1>
        <button onClick={()=>dispatch(logout())}>Đăng xuất</button>
        </>
    )
}