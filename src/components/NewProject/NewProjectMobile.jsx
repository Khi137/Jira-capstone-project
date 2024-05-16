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

const NewProjectMobile = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [randomNumber, setRandomNumber] = useState("11");
  console.log(" NewProject.jsx:10  NewProject category:", category);

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        setCategory(res.data.content);
      })
      .catch((err) => {
        console.log("🚀 ~ file: NewProject.jsx:15 ~ render ~ err:", err);
      });
  }, [randomNumber]);
  const onFinish = (values) => {
    projectService
      .createProjectAuthorize(values)
      .then((res) => {
        console.log(" NewProject.jsx:45 ~ .then ~ res:", res);
        message.success("Đăng ký thành công");
        // setTimeout(() => {
        //   // window.location.href = "/";
        
        // }, 1000);
        navigate("/");
        form.resetFields();
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("🚀 ~ file: NewProject.jsx:49 ~ onFinish ~ err:", err);
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
            name="basic"
            // labelCol={{
            //   span: 8,
            // }}
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
            // layout="vertical"
          >
            <Form.Item label="Project Name" name="projectname" rules={[]}>
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item label="Project Category" name="category" rules={[]}>
              <Select
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "50px",
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
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "350px",
                }}
              />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <Button className="px-2 mx-1 btnBlue" type="primary" htmlType="submit" size="small">
                Submit
              </Button>
              <Button
                className="px-2 mx-1 btnCancel"
                size="small"
                type="text"
                onClick={() => {
                  // window.location.href = "/";
                  navigate("/");
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
export default NewProjectMobile;
