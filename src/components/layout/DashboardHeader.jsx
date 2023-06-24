import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, setUser } from "../../redux/authSlice";
import { Header } from "antd/es/layout/layout";
import "./dashboardHeader.css";
import { Link } from "react-router-dom";
import { Button, Col, Popover, Row, Space, Tag, message } from "antd";
import imagePath from "../../assets/logo.png";
import { useEffect } from "react";
import axios from "axios";
export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.auth.token)
  const user = useSelector((state) => state.auth.user);
  const content = (
    <>
      <div className="center column dashboardPopup">
        <button
          className="button"
          style={{
            width: "60px",
            height: "60px",
          }}
        >
          B
        </button>
        <br />
        <div className="fs18 text-muted">{user && user.name}</div>
        {user && (
          <Tag
            color={user.roles[0].meta.color}
            style={{
              color: user.roles[0].meta?.["text-color"],
            }}
            className="pointer fs14 text-muted"
          >
            {user.name}
          </Tag>
        )}
        <br />
      </div>
      <div className="dashboardPopOverBottom">
        <Button type="text">Hồ sơ</Button>
        <Button
          type="text"
          className="redText redBg"
          onClick={() => dispatch(logoutAsync())}
        >
          Đăng xuất
        </Button>
      </div>
    </>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://wlp.howizbiz.com/api/me",
          config
        );
        const user = response.data.user;
        dispatch(setUser(user));
      } catch (error) {
        message.error(error);
      }
    };
      fetchData();
  }, [dispatch, token]);

  return (
    <>
      <Header className="dashboardHeader" style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
        }}>
        <Row align="middle" className="h-100 w-100">
          <Col className="h-100 ellipsis-text">
            <Space size="small" className="h-100">
              <Link
                to="/index"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src={imagePath} alt="Logo" style={{ height: "40px" }} />
              </Link>
              <h1 className="ellipsis-text" >
                HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
                TIÊN BẢO VỆ
              </h1>
            </Space>
          </Col>
          <Col flex="auto" className="h-100">
            <Popover
              placement="bottom"
              content={content}
              trigger="click"
              className="pointer dashboardPopOver h-100"
            >
              <div className="right">
                <Space size="small" className="center h-100">
                  <button className="button">B</button>
                  <p className="h-100">{user && user.name}</p>
                </Space>
              </div>
            </Popover>
          </Col>
        </Row>
      </Header>
    </>
  );
};
