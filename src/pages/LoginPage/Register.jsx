import {
  Alert,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  message,
} from "antd";
import React from "react";
import { userService } from "../../service/service";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Success:", values);
    let newUser = {
      email: values?.email,
      passWord: values?.passWord,
      name: values?.name,
      phoneNumber: values?.prefix + values?.phone,
    };
    userService
      .register(newUser)
      .then((res) => {
        message.success("Successful Registration!");
        let inforUser = {
          email: values?.email,
          passWord: values?.passWord,
        };
        let onSuccess = () => {
          navigate("/login");
        };
        dispatch(loginAction(inforUser, onSuccess));
        form.resetFields();
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue="84"
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div>
      <div className="register container">
        <div className="flex flex-col justify-center items-center ">
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 10,
                  verticalLabelPadding: 1,
                },
              },
            }}
          >
            <Form
              className=" flex flex-col align-center justify-center"
              form={form}
              name="register"
              style={
                {
                }
              }
              initialValues={{
                name: "",
                passWord: "",
                email: "",
                phoneNumber: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="mb-2 font-medium m-4 text-center">
                FORM REGISTER
              </div>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  style={
                    {
                    }
                  }
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="passWord"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
                    message: 'Password must contain at least one uppercase letter and one special character',
                  },
                ]}
              >
                <Input.Password
                  style={{
                    // Your custom styles here
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="password2"
                dependencies={["passWord"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("passWord") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
                  style={
                    {

                    }
                  }
                  type="password"
                />
              </Form.Item>

              <Form.Item
                label="Email :"
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "The email address is illegal!",
                  },
                ]}
              >
                <Input
                  style={
                    {

                    }
                  }
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={
                    {

                    }
                  }
                />
              </Form.Item>

              <Form.Item className="w-full flex justify-center items-center">
                <>
                  <Button
                    type="text"
                    htmlType="submit"
                    style={{ backgroundColor: "#1890ff" }}
                    className="px-3 mx-2 lg:px-7 btnBlue"
                  >
                    Register
                  </Button>
                  <Button htmlType="reset" danger className="px-3 mx-2 lg:px-7">
                    Clear
                  </Button>
                  <Button
                    className="px-3 mx-2 lg:px-7"
                    type="text"
                    onClick={() => {

                      navigate("/login");
                    }}
                    style={{ backgroundColor: "#808080", color: "white" }}
                  >
                    Login
                  </Button>
                </>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
export default Register;
