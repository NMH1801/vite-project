import { MenuOutlined } from "@ant-design/icons";
import { Button, theme, Row, Space, Col, Popover } from "antd";
import nguoidungCss from "./header.module.css";
import logoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
// import {logOut} from "../../ultis/postData"
export const HeaderAdmin = ({props}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut(navigate);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const content = (
    <>
      <div className={nguoidungCss.popperContainer}>
        <div
          className={nguoidungCss.button}
          style={{ width: "60px", height: "60px" }}
        >
          B
        </div>
        <br />
        <div className={nguoidungCss.text}>
          <b>Ban quản lý dự án</b>
        </div>
        <Link className={nguoidungCss.textColor}>
          <b>Ban quản lý dự án</b>
        </Link>
        <br />
      </div>
      <div className={nguoidungCss.popperBottom}>
        <Link
          className={nguoidungCss.popperBottomText}
          style={{ color: "black" }}
        >
          Hồ sơ
        </Link>
        <Button
          // to="./dang-nhap"
          type="text"
          className={nguoidungCss.popperBottomText}
          style={{ color: "red" }}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </>
  );
  return (
      <Header
        style={{
          padding: "0px 16px",
          background: colorBgContainer,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 100,
        }}
      >
        <Row align="middle" style={{ alignItems: "center" }}>
          <Col>
            <Space size="middle">
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: "18px" }} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "14px",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  alignItems: "center",
                }}
              />
              <Link
                to="/index"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src={logoImage} alt="Logo" style={{ height: "40px" }} />
              </Link>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
                TIÊN BẢO VỆ
              </h1>
            </Space>
          </Col>
          <Col flex="auto">
            <div
              style={{
                float: "right",
              }}
            >
              <Popover
                placement="bottom"
                content={content}
                trigger="click"
                style={{
                  marginRight: "10px",
                }}
              >
                <div className={nguoidungCss.container}>
                  <Space size="small">
                    <div className={nguoidungCss.button}>B</div>
                    <div className={nguoidungCss.text}>
                      <p>
                        <b>Ban quản lý dự án</b>
                      </p>
                    </div>
                  </Space>
                </div>
              </Popover>
            </div>
          </Col>
        </Row>
      </Header>
  );
};
