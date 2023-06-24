import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
export const Test = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="dynamic_form_item"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.List name="iucn">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  required={false}
                >
                  <Form.Item
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Vui lòng nhập năm",
                      },
                    ]}
                    noStyle
                    name={[field.name, "name"]} // Sử dụng name duy nhất cho mỗi ô Input
                  >
                    <Input
                      placeholder="Passenger's name"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
                <Form.Item
                  required={false}
                  label={index === 0 ? "Passenger's Pass" : ""}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's pass or delete this field.",
                      },
                    ]}
                    noStyle
                    name={[field.name, "pass"]} // Sử dụng name duy nhất cho mỗi ô Input
                  >
                    <Input
                      placeholder="Passenger's pass"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: "60%",
                }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add("The head item", 0);
                }}
                style={{
                  width: "60%",
                  marginTop: "20px",
                }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
