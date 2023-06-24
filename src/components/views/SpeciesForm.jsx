import { Button, Input, Row, Space, Form, Col, Select, Spin } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiTrashCanOutline, mdiPlusOutline } from "@mdi/js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setClass,
  setFamily,
  setGenus,
  setIucns,
  setKingdom,
  setOrder,
  setPhylum,
  setSach_dos,
} from "../../redux/apiSlice";
import { madanhmuc, phanloaihoc, species } from "../../const/const";
import { postData, putData } from "../../api/api";
import { useParams } from "react-router-dom";
export const SpeciesForm = () => {
  const { id } = useParams();

  // console.log(id);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.api);
  const [selectedTypes, setSelectedTypes] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const yearOptions = [];

  const onFinish = async (values) => {
    try {
      // console.log(values);
      values.toa_dos = [];
      setLoading(true);
      if (!editData) {
        await postData(values);
      } else {
        values.id = id;
        await putData(values);
      }
      setLoading(false);
      setTimeout(() => {
        window.location.replace("./");
      }, 1000);
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  //Reset/Gán giá trị cho 6 trường Select cha con
  const handleTypeChange = (value, index) => {
    setSelectedTypes((prevState) => {
      console.log(prevState);
      const newState = [...prevState];
      newState[index] = value;
      console.log(newState.slice(0, index + 1));
      return newState.slice(0, index + 1);
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      kingdom_id: selectedTypes[0],
      phylum_id: selectedTypes[1],
      class_id: selectedTypes[2],
      order_id: selectedTypes[3],
      family_id: selectedTypes[4],
      genus_id: selectedTypes[5],
    });
  }, [selectedTypes, form]);

  //Get dữ liệu của specie
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${species}/${id}`, config);
        console.log(response.data);
        response.data.iucns.forEach((item) => {
          item.nam = item.pivot.nam;
        });
        response.data.sach_dos.forEach((item) => {
          item.nam = item.pivot.nam;
        });
        setEditData(response.data);
        setSelectedTypes([
          response.data.kingdom_id,
          response.data.phylum_id,
          response.data.class_id,
          response.data.order_id,
          response.data.family_id,
          response.data.genus_id,
        ]);
      } catch (error) {
        console.log(error);
        return;
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id, token]);

  //Get dữ liệu DM, cache rồi thì sẽ không get nữa
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const kingdom = await axios.get(
          `${phanloaihoc}ranks[]=Kingdom`,
          config
        );
        dispatch(setKingdom(kingdom.data));
        const phylum = await axios.get(`${phanloaihoc}ranks[]=Phylum`, config);
        dispatch(setPhylum(phylum.data));
        const classData = await axios.get(
          `${phanloaihoc}ranks[]=Class`,
          config
        );
        dispatch(setClass(classData.data));
        const order = await axios.get(`${phanloaihoc}ranks[]=Order`, config);
        dispatch(setOrder(order.data));
        const family = await axios.get(`${phanloaihoc}ranks[]=Family`, config);
        dispatch(setFamily(family.data));
        const genus = await axios.get(`${phanloaihoc}ranks[]=Genus`, config);
        dispatch(setGenus(genus.data));
        const IUCN = await axios.get(`${madanhmuc}IUCN`, config);
        dispatch(setIucns(IUCN.data[0]));

        const REDBOOK = await axios.get(`${madanhmuc}REDBOOK`, config);
        dispatch(setSach_dos(REDBOOK.data[0]));
      } catch (error) {
        console.log(error);
        return;
      }
    };
    if (
      data.kingdom.length === 0 ||
      data.phylum.length === 0 ||
      data.class.length === 0 ||
      data.order.length === 0 ||
      data.family.length === 0 ||
      data.genus.length === 0
    ) {
      fetchData();
    }
  }, [dispatch, token, data]);

  // Khởi tạo giá trị cho Form
  useEffect(() => {
    form.setFieldsValue({
      ten: editData.ten,
      ten_khoa_hoc: editData.ten_khoa_hoc,
      ten_tac_gia: editData.ten_tac_gia,
      ten_dia_phuong: editData.ten_dia_phuong,
      nguon_du_lieu: editData.ten_dia_phuong,
      iucns: editData.iucns,
      sach_dos: editData.sach_dos,
    });
  }, [editData, form]);

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push(
      <Select.Option key={year} value={year}>
        {year}
      </Select.Option>
    );
  }
  return (
    <div>
      {id && editData || !id ? (
        <div className="content">
          <Spin spinning={loading}>
            <Row className="alignItemCenter">
              <Col>
                <Space>
                  <Icon
                    path={mdiArrowLeft}
                    size={2}
                    color="red"
                    onClick={() => {
                      window.location.href = "/dashboard/species";
                    }}
                    className="pointer"
                  />
                  <h1 className="fs18" style={{ margin: 0 }}>
                    THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU
                    TIÊN BẢO VỆ
                  </h1>
                </Space>
              </Col>
            </Row>
            <br />

            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
            >
              <h2>I. Thông tin chung về loài</h2>
              <Col span={11}>
                <Form.Item
                  name="ten"
                  label="Tên"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Row>
                <Col span={5}>
                  <Form.Item
                    name="ten_khoa_hoc"
                    label="Tên khoa học"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={5}>
                  <Form.Item name="ten_tac_gia" label="Tên tác giả">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Col span={11}>
                <Form.Item name="ten_dia_phuong" label="Tên địa phương">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="nguon_du_lieu" label="Nguồn dữ liệu">
                  <Input />
                </Form.Item>
              </Col>
              <h2>II. Phân loại học</h2>
              <Row>
                <Col span={3}>
                  <Form.Item
                    name="kingdom_id"
                    label="Giới"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 0)}
                    >
                      {data &&
                        data.kingdom.map((item) => (
                          <Select.Option key={item.uuid} value={item.uuid}>
                            {item.ten ? item.ten : item.ten_khoa_hoc[0]}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Form.Item
                    name="phylum_id"
                    label="Ngành"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 1)}
                      value={selectedTypes[1]}
                      disabled={!selectedTypes[0]}
                    >
                      {data &&
                        data.phylum
                          .filter((item) => item.parent_id === selectedTypes[0])
                          .map((item) => (
                            <Select.Option key={item.uuid} value={item.uuid}>
                              {item.ten ? item.ten : item.ten_khoa_hoc}
                            </Select.Option>
                          ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Form.Item
                    name="class_id"
                    label="Lớp"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 2)}
                      disabled={!selectedTypes[1]}
                    >
                      {data &&
                        data.class
                          .filter((item) => item.parent_id === selectedTypes[1])
                          .map((item) => (
                            <Select.Option key={item.uuid} value={item.uuid}>
                              {item.ten ? item.ten : item.ten_khoa_hoc}
                            </Select.Option>
                          ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <Form.Item
                    name="order_id"
                    label="Bộ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 3)}
                      disabled={!selectedTypes[2]}
                    >
                      {data &&
                        data.order
                          .filter((item) => item.parent_id === selectedTypes[2])
                          .map((item) => (
                            <Select.Option key={item.uuid} value={item.uuid}>
                              {item.ten ? item.ten : item.ten_khoa_hoc}
                            </Select.Option>
                          ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Form.Item
                    name="family_id"
                    label="Họ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 4)}
                      disabled={!selectedTypes[3]}
                    >
                      {data &&
                        data.family
                          .filter((item) => item.parent_id === selectedTypes[3])
                          .map((item) => (
                            <Select.Option key={item.uuid} value={item.uuid}>
                              {item.ten ? item.ten : item.ten_khoa_hoc}
                            </Select.Option>
                          ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Form.Item
                    name="genus_id"
                    label="Chi"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      onChange={(value) => handleTypeChange(value, 5)}
                      disabled={!selectedTypes[4]}
                    >
                      {data &&
                        data.genus
                          .filter((item) => item.parent_id === selectedTypes[4])
                          .map((item) => (
                            <Select.Option key={item.uuid} value={item.uuid}>
                              {item.ten ? item.ten : item.ten_khoa_hoc}
                            </Select.Option>
                          ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <h2>III. Tình trạng bảo tồn</h2>
              <Row>
                <Col span={10}>
                  <Form.List name="sach_dos">
                    {(fields, { add, remove }, { errors }) => (
                      <div>
                        <h2>Sách đỏ</h2>
                        <Row>
                          <Col span={9}>
                            <h2 className="fs18">Năm</h2>
                          </Col>
                          <Col span={2}></Col>
                          <Col span={9}>
                            <h2 className="fs18">Hiện trạng</h2>
                          </Col>
                        </Row>
                        {fields.map((field) => (
                          <Row key={field.key}>
                            <Col span={9}>
                              <Form.Item required={false}>
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng nhập năm",
                                    },
                                  ]}
                                  noStyle
                                  name={[field.name, "nam"]}
                                >
                                  <Select
                                    placeholder="Chọn năm"
                                    className="w-100"
                                  >
                                    {yearOptions}
                                  </Select>
                                </Form.Item>
                              </Form.Item>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={9}>
                              <Form.Item required={false}>
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng chọn hiện trạng",
                                    },
                                  ]}
                                  noStyle
                                  name={[field.name, "id"]}
                                >
                                  <Select
                                    className="w-100"
                                    placeholder="Chọn loài hiện trạng"
                                  >
                                    {data &&
                                      data.sach_dos.childs.map((item) => (
                                        <Select.Option
                                          key={item.id}
                                          value={item.id}
                                        >
                                          {item.ma_danh_muc} - {item.ten}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Form.Item>
                            </Col>

                            <Col span={3}></Col>
                            <Col span={1}>
                              {fields.length > 0 ? (
                                <Icon
                                  className="pointer"
                                  path={mdiTrashCanOutline}
                                  size={1}
                                  color="red"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Col>
                            <br />
                            <br />
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            className="w-100"
                            onClick={() => {
                              add();
                            }}
                          >
                            <Icon path={mdiPlusOutline} size={1} />
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
                <Col span={4} />
                <Col span={10}>
                  <Form.List name="iucns">
                    {(fields, { add, remove }, { errors }) => (
                      <div>
                        <h2>IUCN</h2>
                        <Row>
                          <Col span={9}>
                            <h2 className="fs18">Năm</h2>
                          </Col>
                          <Col span={2}></Col>
                          <Col span={9}>
                            <h2 className="fs18">Hiện trạng</h2>
                          </Col>
                        </Row>
                        {fields.map((field) => (
                          <Row key={field.key}>
                            <Col span={9}>
                              <Form.Item required={false}>
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng nhập năm",
                                    },
                                  ]}
                                  noStyle
                                  name={[field.name, "nam"]}
                                >
                                  <Select
                                    placeholder="Chọn năm"
                                    className="w-100"
                                  >
                                    {yearOptions}
                                  </Select>
                                </Form.Item>
                              </Form.Item>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={9}>
                              <Form.Item required={false}>
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng chọn hiện trạng",
                                    },
                                  ]}
                                  noStyle
                                  name={[field.name, "id"]}
                                >
                                  <Select
                                    className="w-100"
                                    placeholder="Chọn loài hiện trạng"
                                  >
                                    {data &&
                                      data.iucns.childs.map((item) => (
                                        <Select.Option
                                          key={item.id}
                                          value={item.id}
                                        >
                                          {item.ma_danh_muc} - {item.ten}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Form.Item>
                            </Col>

                            <Col span={3}></Col>
                            <Col span={1}>
                              {fields.length > 0 ? (
                                <Icon
                                  className="pointer"
                                  path={mdiTrashCanOutline}
                                  size={1}
                                  color="red"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Col>
                            <br />
                            <br />
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            className="w-100"
                            onClick={() => {
                              add();
                            }}
                          >
                            <Icon path={mdiPlusOutline} size={1} />
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button type="primary" danger htmlType="submit">
                    {!editData ? "Thêm mới" : "Sửa"}
                  </Button>
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      ) : <Spin></Spin> }
    </div>

  );
};
