import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import { useNavigate } from "react-router-dom";
import { setInfoAction } from "../../redux/action/user";
import { useDispatch } from "react-redux";
import { ConsoleSqlOutlined } from "@ant-design/icons";

export default function TabUserSettingDesktop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let data = JSON.parse(localStorage.getItem("USER"));
  console.log(
    "🚀 ~ file: TabUserSetting.jsx:11 ~ TabUserSetting ~ data:",
    data
  );
  let reduxUser = useSelector((state) => state.userReducer.user);
  console.log("🚀 ~ file:reduxUser:", reduxUser)

  const [newData, setNewData] = useState(data);

  console.log("newData", newData)
  let initValue = {}
  if (reduxUser) {
    initValue = {
      id: reduxUser.userId,
      name: reduxUser.name,
      passWord: "",
      email: reduxUser.email,
      phoneNumber: reduxUser.phoneNumber,

    }
  } else {
    initValue = {

      id: newData?.id,
      name: newData?.name,
      passWord: "",
      email: newData?.email,
      phoneNumber: newData?.phoneNumber,

    }
  }
  // const newData = data;



  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFinish = (values) => {
    let updateUser = {
      id: values.id,
      passWord: values.passWord,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
    };
    console.log(updateUser);
    usersManageService
      .editUser(updateUser)
      .then((res) => {

        message.success("Successfully updated!");
        setNewData(updateUser);
        navigate("/");
      })
      .then(() => {
        usersManageService
          .getUser(data.id)
          .then((result) => {

            //  console.log("user api", result.data.content);
            const nowUser = result.data.content.find(item => item.userId == data.id)
            // console.log("now user",nowUser)
            dispatch(setInfoAction(nowUser));
            // localStorage.setItem("USER", JSON.stringify(result.data.content[0]));
          })
          .catch((err) => {
            console.log("err", err);
          });


      })
      .catch((err) => {
        message.error("Failed to update!");
        console.log("🚀 ~ file: TabUserSetting.jsx:36 ~ onFinish ~ err:", err);
      });

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // useEffect(() => form.resetFields(), [newData]);
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
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <ConfigProvider
          theme={{
            //     token:{
            // margin:10
            //     },
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
                // maxWidth: 1000,
                // maxHeight: 1000,
                width: 300
              }
            }
            initialValues={initValue}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          // layout="vertical"
          >

            <div className="mb-2 font-medium text-center ">User Information</div>
            <Form.Item

              label=""
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                addonBefore="ID:"
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                disabled={true}
                value={newData?.userId}
              />
            </Form.Item>

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
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                value={newData?.name}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passWord"
              rules={[{ required: true }]}
            >
              <Input.Password
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
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
                style={{
                  // borderColor: "black",e
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                value={newData?.email}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                // addonBefore={prefixSelector}
                value={newData?.phoneNumber}
              />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <>
                {" "}
                <Button
                  type="text"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#1890ff",
                    minWidth: "100px",
                    borderRadius: "30px",
                  }}
                  className="btnBlue"
                >
                  Edit
                </Button>
                <Button
                  className="px-3 mx-2 btnCancel"
                  type="text"
                  onClick={() => {
                    // window.location.href = "/";
                    navigate("/");
                  }}
                  style={{
                    backgroundColor: "#808080",
                    color: "white",
                    borderRadius: "30px",
                    minWidth: "100px",
                  }}
                >
                  Cancel
                </Button>
              </>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
