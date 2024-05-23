import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { projectService } from "../../service/service";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  message,
} from "antd";

import { Option } from "antd/es/mentions";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const NewProjectDesktop = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [randomNumber, setRandomNumber] = useState("2424");
  console.log("category:", category);

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        setCategory(res.data.content);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [randomNumber]);
  const onFinish = (values) => {
    projectService
      .createProjectAuthorize(values)
      .then((res) => {
        console.log("res:", res);
        message.success("Đăng ký thành công");
        navigate("/");
        form.resetFields();
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("err:", err);
        message.error("Đăng ký thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      {/* <HeaderBar /> */}
      <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Projects</NavLink>,
            },
            {
              title: "New Project",
            },
          ]}
        />
        <h3 className="text-center  mb-3 font-medium ">NEW PROJECT</h3>
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
            name="basic"
            style={{
              maxWidth: 400,
              maxHeight: 300,

            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Project Name" name="projectname" rules={[]}>
              <Input
                style={{
                }}
              />
            </Form.Item>

            <Form.Item label="Project Category" name="category" rules={[]}>
              <Select
                style={{
                }}
                defaultValue="Lựa chọn loại dự án"
              >
                {category?.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.projectCategoryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[]}>
      
              <Input.TextArea
                rows={2}
                style={{
                }}
              />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <Button className="px-3 mx-2 btnBlue" type="primary" htmlType="submit">
                Submit
              </Button>
              
              <Button
                className="px-3 mx-2 btnCancel"
                type="text"
                onClick={() => {
                  navigate("/")
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};
export default NewProjectDesktop;
