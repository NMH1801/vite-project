import dangnhap from "./dangnhap.module.css";
import {  Row, Col, Form, Input, Button, message, Alert } from "antd";
import { Link} from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
export const Login = () => {
  return (
    <div className={dangnhap.login}>
      <Header />
      <Footer />
    </div>
  );
};

function Header() {
  return (
    <div className={dangnhap.header}>
      <Row align="middle">
        <Col>
          <Link to="/">
            <img
              src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
              alt="Logo"
              style={{
                height: "70px",
              }}
            />
          </Link>
        </Col>
        <Col flex="auto">
          <h1>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h1>
        </Col>
      </Row>
    </div>
  );
}

function Footer() {
  return (
    <div className={dangnhap.footerContainer + " " + dangnhap.formContainer}>
      <div className={dangnhap.form}>
        <LoginForm />
      </div>
    </div>
  );
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const onFinish = (values) => {
    dispatch(loginAsync(values));
  };
  const onFinishFailed = () => {
    message.error("Thất bại");
  };
  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      wrapperCol={{
        span: 24,
      }}
      style={{
        padding: "16px",
        textAlign: "center",
        width: "400px",
      }}
    >
      
      {error!= null &&<Alert message={error} type="error" showIcon />}
      <Link to="/">
        <img
          src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
          alt="Logo"
          style={{
            height: "110px",
          }}
        />
      </Link>

      <h2>Đăng nhập</h2>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên đăng nhập!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Tên đăng nhập"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item>
          {loading ? (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "red",
                borderRadius: "24px",
              }}
              loading
            >
              Đang đăng nhập
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "red",
                borderRadius: "24px",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Form.Item>
        <Button
          type="link"
          href="/quen-mat-khau"
          style={{
            color: "red",
          }}
        >
          Quên mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};
