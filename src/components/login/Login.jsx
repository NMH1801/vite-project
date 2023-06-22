import { Link } from "react-router-dom";
import "./login.css";
import imagePath from "../../assets/logo.png"
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { Button, message } from "antd";
export const LoginV2 = () => {
    return (
        <div className="loginContainer">
            <Header />
            <Footer />
        </div>
    )
}
const Header = () => {
    return (
        <div className="loginHeaderContainer">
            <div className="row align-items-center">
                <div className="col-auto">
                    <Link to="/">
                        <img
                            src={imagePath}
                            alt="Logo"
                            style={{
                                height: "70px",
                            }}
                        />
                    </Link>
                </div>
                <div className="col">
                    <h1>
                        HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
                        BẢO VỆ
                    </h1>
                </div>
            </div>
        </div>
    );
}

const Footer = () => {
    return (
        <div className="loginFooterContainer loginFormContainer">
            <Form />
        </div>
    );
}

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const errorApi = useSelector((state) => state.auth.error);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const onSubmit = (values) => {
        dispatch(loginAsync(values));
    };
    useEffect(() => {
        if (errorApi) {
            message.error(errorApi, 2);
        }
    }, [errorApi]);

    return (
        <div className="loginForm">
            <Link to="/">
                <img
                    src={imagePath}
                    alt="Logo"
                    style={{
                        height: "110px",
                    }}
                />
            </Link>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className={`input-group loginInput d-flex align-items-center ${errors.username ? 'loginError' : ''}`}>

                    <AiOutlineUser className="loginIcon" />
                    <input
                        type="text"
                        className="form-control border-0 "
                        placeholder="Tên đăng nhập"
                        {...register("username", { required: true })}
                    />
                </div>
                {errors.username ? <div className="errorNoti">Trường tên đăng nhập không được bỏ trống.</div> : <div className="blank"></div>}
                <div className={`input-group loginInput d-flex align-items-center ${errors.password ? 'loginError' : ''}`}>
                    <AiOutlineLock className="loginIcon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0"
                        placeholder="Mật khẩu"
                        {...register("password", { required: true, minLength: 8 })}
                    />
                    <span className="loginIcon pointer" onClick={() => { handleTogglePassword() }}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                {errors.password ? (
                    errors.password.type === "required" ? (
                        <div className="errorNoti">Trường mật khẩu không được bỏ trống.</div>
                    ) : (
                        <div className="errorNoti">Trường mật khẩu phải có tối thiểu 8 ký tự.</div>
                    )
                ) : (
                    <div className="blank"></div>
                )}
                <Button
                    htmlType="submit"
                    className="buttonColorRed w-100 borderRadius"
                    size="large"
                    loading={loading}
                >
                    Đăng nhập
                </Button>

            </form>
        </div >
    )
}