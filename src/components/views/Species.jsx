import Icon from "@mdi/react";
import { mdiPen, mdiSheep, mdiTrashCanOutline } from "@mdi/js";
import {
  Avatar,
  Button,
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./species.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setItem,
  setLoading,
  setPage,
  setPageSize,
  setSearch,
  setTotal,
} from "../../redux/fetchDataSlice";
import axios from "axios";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { endpoint } from "../../const/const";
import { deleteData } from "../../api/api";
import { useState } from "react";
const classData = "class";
export const Species = () => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "ten",
      visible: true,
      render: (ten, record) => (
        <Space>
          {record.attachments && record.attachments.length > 0 ? (
            <Avatar
              src={"http://wlp.howizbiz.com/" + record.attachments[0].path}
            />
          ) : (
            <Avatar src="http://wlp.howizbiz.com/static/img/favicon.e4ca0e6e.png" />
          )}
          {ten}
        </Space>
      ),
    },
    {
      title: "Tên khoa học",
      dataIndex: "ten_khoa_hoc",
    },
    {
      title: "Giới",
      dataIndex: "kingdom",
      render: (kingdom) => kingdom.ten,
    },
    {
      title: "Ngành",
      dataIndex: "phylumn",
      render: (phylumn) => phylumn.ten,
    },
    {
      title: "Lớp",
      dataIndex: classData,
      render: (classData) =>
        classData.ten !== "" && classData.ten !== null
          ? classData.ten
          : classData.ten_khoa_hoc,
    },
    {
      title: "Bộ",
      dataIndex: "order",
      render: (order) =>
        order.ten !== "" && order.ten !== null ? order.ten : order.ten_khoa_hoc,
    },
    {
      title: "Họ",
      dataIndex: "family",
      render: (family) =>
        family.ten !== "" && family.ten !== null
          ? family.ten
          : family.ten_khoa_hoc,
    },
    {
      title: "Chi",
      dataIndex: "genus",
      render: (genus) =>
        genus.ten !== "" && genus.ten !== null ? genus.ten : genus.ten_khoa_hoc,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space size="small" className="action-buttons">
          <Button
            type="link"
            className="red"
            onClick={() => {
              window.location.href = `species/edit/${record.id}`;
            }}
          >
            <Icon path={mdiPen} size={1} color="red" />
          </Button>
          <Button
            type="link"
            className="red"
            onClick={() => {
              showModal(record);
            }}
          >
            <Icon
              className="pointer"
              path={mdiTrashCanOutline}
              size={1}
              color="red"
            />
          </Button>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.fetchData.items);
  const loading = useSelector((state) => state.fetchData.loading);
  const page = useSelector((state) => state.fetchData.page);
  const pageSize = useSelector((state) => state.fetchData.pageSize);
  const total = useSelector((state) => state.fetchData.total);
  const token = useSelector((state) => state.auth.token);
  const search = useSelector((state) => state.fetchData.search);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState("");
  const [flag, setFlag] = useState(true);
  const showModal = (record) => {
    setIsModalOpen(true);
    setRecord(record);
  };

  const handleOk = async () => {
    setButtonLoading(true);
    await deleteData(record.id);
    setButtonLoading(false);
    setIsModalOpen(false);
    setFlag(!flag);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (value) => {
    dispatch(setSearch(value));
    dispatch(setPage(1));
  };
  const handleSearchDebounced = debounce(handleSearch, 500);
  const searchParam = search !== "" ? `&search=${search}` : "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${endpoint}species?paginate=true&page=${page}&perpage=${pageSize}${searchParam}`,
          config
        );
        dispatch(setItem(response.data.list));
        dispatch(setTotal(response.data.pagination.total));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchData();
  }, [dispatch, token, page, pageSize, searchParam, flag]);
  return (
    <div className="content">
      <Row className="alignItemCenter">
        <Space>
          <div className="sheepIcon">
            <Icon path={mdiSheep} size={1} color="red" />
          </div>
          <h1 className="fs18" style={{ margin: 0 }}>
            {" "}
            Loài nguy cấp quý hiếm
          </h1>
        </Space>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm theo tên"
            size="large"
            className="inputUser"
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => handleSearchDebounced(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Button
            className="right"
            size="large"
            onClick={() => {
              window.location.href = "/dashboard/species/insert";
            }}
          >
            <Link>Thêm mới</Link>
          </Button>
        </Col>
      </Row>
      <br />
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{
            y: 500,
            x: 800,
          }}
          className="tableData"
        />
        <br />
        {total === 0 ? (
          ""
        ) : (
          <Row justify="space-between" align="middle">
            <Col span={8}>
              {(page - 1) * pageSize + 1 === total ? (
                <p>
                  {total}/{total}
                </p>
              ) : (
                <p>{`${(page - 1) * pageSize + 1}-${Math.min(
                  page * pageSize,
                  total
                )}/${total}`}</p>
              )}
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Pagination
                current={page}
                total={total}
                pageSize={pageSize}
                onChange={(page) => dispatch(setPage(page))}
                showSizeChanger={false}
              />
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <Select
                value={pageSize.toString()}
                onChange={(newPageSize) => dispatch(setPageSize(newPageSize))}
              >
                <Select.Option value="5">5 / trang</Select.Option>
                <Select.Option value="10">10 / trang</Select.Option>
                <Select.Option value="25">25 / trang</Select.Option>
                <Select.Option value="50">50 / trang</Select.Option>
              </Select>
            </Col>
          </Row>
        )}
      </Spin>

      <Modal
        title="Cảnh báo"
        confirmLoading={buttonLoading}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa đối tượng {record.ten} không?</p>
      </Modal>
    </div>
  );
};
