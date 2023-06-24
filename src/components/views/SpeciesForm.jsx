import { Button, Input, Row, Space, Form, Col, Select, message } from "antd";
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
import { madanhmuc, phanloaihoc } from "../../const/const";
import { postData } from "../../api/api";
export const SpeciesForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.api);

  const onFinish = async (values) => {
    try {
      values.toa_dos = [];
      await postData(values);
      message.success("á");
    } catch (error) {
        console.error("Form11",error);
    }
  };

  const [selectedTypes, setSelectedTypes] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const handleTypeChange = (value, index) => {
    setSelectedTypes((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState.slice(0, index + 1);
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      phylum: selectedTypes[1],
      class: selectedTypes[2],
      order: selectedTypes[3],
      family: selectedTypes[4],
      genus: selectedTypes[5],
    });
  }, [selectedTypes, form]);
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const yearOptions = [];
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
    fetchData();
  }, [dispatch, token]);
  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push(
      <Select.Option key={year} value={year}>
        {year}
      </Select.Option>
    );
  }
  return (
    <div className="content">
      <Row className="alignItemCenter">
        <Space>
          <Icon path={mdiArrowLeft} size={2} color="red" />
          <h1 className="fs18" style={{ margin: 0 }}>
            THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h1>
        </Space>
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
                            <Select placeholder="Chọn năm" className="w-100">
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
                            <Select placeholder="Chọn năm" className="w-100">
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
