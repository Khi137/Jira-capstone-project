import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Modal,
  Popover,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import { projectService, userService } from "../../service/service";
import { NavLink } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { setProjectData } from "../../redux/action/project";
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabProjectsMobile() {
  const dispatch = useDispatch();
  const [randomNumber, setRandomNumber] = useState("11");
  const [toggle, setToggle] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [project, setProject] = useState(null);
  const [category, setCategory] = useState();

  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  let data = JSON.parse(localStorage.getItem("USER"));
  const [projectData, setProjectDataCom] = useState();
  console.log("🚀 ~ file:  projectData:", projectData)
  
  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  console.log("projectDataRedux", projectDataRedux);

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        console.log("🚀 ~ file: TabProjects.jsx:41 ~ .then ~ res:", res);
        setCategory(res.data.content);
      })
      .catch((err) => {});
  }, []);

  //update project when delete
  useEffect(() => {
    projectService
      .getProjectList()
      .then((result) => {
        // console.log("chay updatae");
      
         dispatch(setProjectData(result.data.content));

        setProjectDataCom(result.data.content);
      
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [randomNumber]);
  // useEffect(()=>{
  //   dispatch(setProjectData(projectData));
  // },[randomNumber])

  //reset field khi project đổi
  useEffect(() => form.resetFields(), [project]);
  const showDrawer = () => {
    // form.resetFields();
    setOpen(true);
  };
  const onClose = () => {
    // window.location.href = "/";

    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("🚀 ~ file: TabProjects.jsx:60 ~ onFinish ~ values:", values);
    let dataUpdate = {
      id: values.id,
      projectName: values.projectName,
      creator: data.id,
      description: values.description,
      // categoryId: values.category,
      categoryId: project?.projectCategory?.id.toString(),
    };
    projectService
      .updateProject(project.id, values)
      .then((res) => {
        message.success("Edit thành công");

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1000);
        setOpen(false);
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("🚀 ~ file: TabProjects.jsx:77 ~ onFinish ~ err:", err);
        message.error("Edit thất bại");
      });
    console.log(
      "🚀 ~ file: TabProjects.jsx:70 ~ onFinish ~ dataUpdate:",
      dataUpdate
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [projectDataReduxById, setProjectDataReduxById] = useState([]);
  //const [toggleData, setToggleData] = useState([]);
  //lấy data redux
  useEffect(() => {
    // console.log("chạy ueff của redux");
    if (projectDataRedux) {
      const projectDataReduxById = projectDataRedux.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataCom(projectDataRedux);
      setProjectDataReduxById(projectDataReduxById);
      //setToggleData(projectDataReduxById);
    }
  }, [projectDataRedux]);

  // call api data
  useEffect(() => {
    // console.log("chạy ueff lay api projectdata truc tiep");
    if (projectData) {
      const projectDataReduxById = projectData.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataCom(projectData);
    
      setProjectDataReduxById(projectDataReduxById);
      //setToggleData(projectDataReduxById);
    }
  }, [projectData]);

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);

    if (checked == true) {
      setToggle(true);
      // setToggleData(projectDataReduxById);
    } else if (checked == false) {
      // setToggleData(projectDataRedux);
      setToggle(false);
    }
  };

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState();
  // console.log("deleteProject",deleteProject)
  const handleOk = () => {
    projectService
      .deleteProject(deleteProject.id)
      .then((res) => {
        message.success("Xóa dự án thành công");
        setRandomNumber(Math.random());
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1000);
      })
      .catch((err) => {
        message.error("Xóa dự án thất bại");
      })
      .finally(setIsModalOpen(false));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
  
    {
      title: "Project Name",
      dataIndex: "projectName",
      
      render: (text, record, index) => {
        return (
          <Tag color="purple">
            <NavLink
              to={`/projectdetail/${record.id}`}
              style={{ color: "#531dab", fontSize: "14px" }}
            >
              {text}
            </NavLink>
          </Tag>
        );
      },
      
    },

    {
      title: "Action",
      key: "action",
      width: 90,
      render: (_, record) => {
        return (
          <>
            <Space size="small">
              <Button
              type="primary"
                className="btnBlue"
                // type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  projectService
                    .getProjectDetail(record.id)
                    .then((res) => {
                      // form.resetFields();
                      setProject(res.data.content);
                    })
                    .then(() => {
                      showDrawer();
                    })
                    .catch((err) => {
                      console.log("jsx:257 ~ TabProjects ~ err:", err);
                    });
                }}
              ></Button>
              <Button
                type="text"
                className="btnRed"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeleteProject(record);
                  setIsModalOpen(true);
                }}
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#001529",
            color: "red",
          },
          components: {
            Form: {
              itemMarginBottom: 20,
              verticalLabelPadding: 1,
            },
          },
        }}
      >
        <Switch
          className="switch"
          style={{ marginBottom: "25px" }}
          checkedChildren="Your Project"
          unCheckedChildren="All Project"
          defaultChecked
          onChange={onChangeSwitch}
        />

        <Drawer
          title="Edit Project"
          placement="right"
          onClose={() => {
            onClose();
          }}
          open={open}
        >
          <Form
            form={form}
            name="basic"
            style={{ width: "700" }}
            initialValues={{
              id: project?.id,
              projectName: project?.projectName,
              categoryId: project?.projectCategory?.id,
              description: project?.description,
              // remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // layout="vertical"
          >
            <Form.Item
              name="id"
              label="ID"
              // style={{ marginTop: "20px" }}
              rules={[]}
            >
              <Input
                style={{
                  borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "50px",
                }}
                values={project?.id}
                disabled={true}
              />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "20px" }}
              name="projectName"
              label="Project Name"
              rules={[]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "50px",
                }}
                values={project?.projectName}
              />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "20px" }}
              name="categoryId"
              label="Project Category"
              rules={[]}
            >
              <Select
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // height: "50px",
                }}
                values={{
                  value: project?.projectCategory?.id,
                  label: project?.projectCategory?.name,
                }}
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
                rows={4}
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  height: "50px",
                }}
                values={project?.description}
              />
            </Form.Item>

            <Form.Item>
            <Space style={{width:"100%", justifyContent:"center"}}>
              <Button
                className="btnBlue"
               
                htmlType="submit"
         
              >
                Submit
              </Button>
              <Button
                className="btnCancel"
                type="text"
                onClick={() => {
                  onClose();
                }}
           
              >
                Cancel
              </Button>
              </Space>
            </Form.Item>
          </Form>
        </Drawer>

        <Modal
          title="Delete Project"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         <span className="flex"> <p>Are you sure to delete this Project: </p><p className="text-red-500  pl-1">  {deleteProject?.projectName
}</p></span>
        </Modal>
      </ConfigProvider>

      {toggle === true ?
 <Table
 size="small"
   columns={columns}
   dataSource={projectDataReduxById}
   onChange={onChange}
   scroll={{
     y: 200,
   }}
 /> :<Table
  size="small"
    columns={columns}
    dataSource={projectData}
    onChange={onChange}
    scroll={{
      y: 200,
    }}
  />
}
    </div>
  );
}
