import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import { useNavigate } from "react-router-dom";
import { setInfoAction } from "../../redux/action/user";
import { useDispatch } from "react-redux";

export default function TabUserSettingMobile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let data = JSON.parse(localStorage.getItem("USER"));
  console.log(
    "🚀 ~ file: TabUserSetting.jsx:11 ~ TabUserSetting ~ data:",
    data
  );
  let reduxUser  = useSelector((state) => state.userReducer.user);
  console.log("🚀 ~ file:reduxUser:", reduxUser)

  const [newData, setNewData] = useState(data);

console.log("newData",newData)
  let initValue = {}
  if(reduxUser){
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
       
      })
      .then(()=>{
          usersManageService
              .getUser(data.id)
              .then((result) => {
                const nowUser = result.data.content.find(item=>item.userId==data.id)
              dispatch(setInfoAction(nowUser));
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

                width:200
              }
            }
            initialValues={initValue}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

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
                }}
                value={newData?.phoneNumber}
              />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <>
                {" "}
                <Button
                 size="small"
                  type="text"
                  htmlType="submit"
                  className="btnBlue"
                >
                  Edit
                </Button>
                <Button
                  className="px-1 mx-1 btnCancel"
                  size="small"
                  type="text"
                  onClick={() => {
                    navigate("/" );
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
