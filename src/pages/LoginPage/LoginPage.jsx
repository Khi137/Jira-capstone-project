import React, { useState } from "react";
import {
  FacebookFilled,
  LockOutlined,
  MailOutlined,
  TwitterCircleFilled,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, setInfoAction } from "../../redux/action/user";
import Lottie from "lottie-react";
import iconLogin from "../../assets/json/iconLogin.json";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFinish = (values) => {
    console.log("values", values);

    let onSuccess = () => (window.location.href = "/");
    dispatch(loginAction(values, onSuccess));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Fail to login!!!");
  };

  return (
    <div
      className="container"
      style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* LottieFile */}
      <div className="lottie-container" style={{ flex: "1" }}>
        <Lottie animationData={iconLogin} />
      </div>

      {/* Form đăng nhập */}
      <div className="form-container" style={{ flex: "1" }}>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
            JIRA LOGIN
          </h3>
          <Form
            className="flex flex-col align-center justify-center login-form"
            style={{ paddingTop: "10px", width: "300px" }}
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Các mục Form */}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email", // Kiểm tra email hợp lệ
                },
              ]}
            >
              <Input
                style={{
                  width: "300px",
                  height: "50px",
                }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password correctly!",
                  min: 6, // ít nhất 6 ký tự
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/g, // ít nhất một chữ cái viết hoa và một ký tự đặc biệt
                },
              ]}
            >
              <Input.Password
                style={{
                  width: "300px",
                  height: "50px",
                }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="text"
                htmlType="submit"
                className="btnBlue"
                style={{
                  backgroundColor: "#4a9fc4",
                  minWidth: "300px",
                }}
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              You don't have account already?{" "}
              <NavLink to={"/register"}>
                <span style={{ color: "#FA264B" }}>Register Now!</span>
              </NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
