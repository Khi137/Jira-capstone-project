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
  const [searchText, setSearchText] = useState("");

  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  let data = JSON.parse(localStorage.getItem("USER"));
  const [projectData, setProjectDataCom] = useState();

  let { projectDataRedux } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        setCategory(res.data.content);
      })
      .catch((err) => { });
  }, []);

  useEffect(() => {
    projectService
      .getProjectList()
      .then((result) => {
        dispatch(setProjectData(result.data.content));
        setProjectDataCom(result.data.content);
      })
      .catch((err) => { });
  }, [randomNumber]);

  useEffect(() => form.resetFields(), [project]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    let dataUpdate = {
      id: values.id,
      projectName: values.projectName,
      creator: data.id,
      description: values.description,
      categoryId: project?.projectCategory?.id.toString(),
    };
    projectService
      .updateProject(project.id, values)
      .then((res) => {
        message.success("Edit successfully");
        setOpen(false);
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        message.error("Edit failed");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [projectDataReduxById, setProjectDataReduxById] = useState([]);
  useEffect(() => {
    if (projectDataRedux) {
      const projectDataReduxById = projectDataRedux.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataCom(projectDataRedux);
      setProjectDataReduxById(projectDataReduxById);
    }
  }, [projectDataRedux]);

  useEffect(() => {
    if (projectData) {
      const projectDataReduxById = projectData.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataCom(projectData);
      setProjectDataReduxById(projectDataReduxById);
    }
  }, [projectData]);

  const onChangeSwitch = (checked) => {
    setToggle(checked);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filterProjects = (projects, searchText) => {
    return projects.filter((project) =>
      project.projectName.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState();
  const handleOk = () => {
    projectService
      .deleteProject(deleteProject.id)
      .then((res) => {
        message.success("Delete successfully");
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        message.error("Delete failed");
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
                icon={<EditOutlined />}
                onClick={() => {
                  projectService
                    .getProjectDetail(record.id)
                    .then((res) => {
                      setProject(res.data.content);
                    })
                    .then(() => {
                      showDrawer();
                    })
                    .catch((err) => { });
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

  const filteredProjects = toggle
    ? filterProjects(projectDataReduxById, searchText)
    : filterProjects(projectData, searchText);

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
        <Space style={{ marginBottom: "10px" }}>
          <Switch
            className="switch"
            checkedChildren="Your Project"
            unCheckedChildren="All Project"
            defaultChecked
            onChange={onChangeSwitch}
          />
          <Input.Search
            placeholder="Search Project"
            onSearch={onSearch}
            style={{ width: 200 }}
            allowClear
          />
        </Space>

        <Drawer
          title="Edit Project"
          placement="right"
          onClose={onClose}
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
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="id" label="ID" rules={[]}>
              <Input
                style={{ borderColor: "black" }}
                value={project?.id}
                disabled
              />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "20px" }}
              name="projectName"
              label="Project Name"
              rules={[]}
            >
              <Input value={project?.projectName} />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "20px" }}
              name="categoryId"
              label="Project Category"
              rules={[]}
            >
              <Select
                value={{
                  value: project?.projectCategory?.id,
                  label: project?.projectCategory?.name,
                }}
              >
                {category?.map((item, index) => {
                  return (
                    <Select.Option value={item.id} key={index}>
                      {item.projectCategoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[]}>
              <Input.TextArea
                rows={4}
                style={{ height: "50px" }}
                value={project?.description}
              />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "center" }}>
                <Button className="btnBlue" htmlType="submit">
                  Submit
                </Button>
                <Button
                  className="btnCancel"
                  type="text"
                  onClick={onClose}
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
          <span className="flex">
            <p>Are you sure to delete this Project: </p>
            <p className="text-red-500 pl-1">{deleteProject?.projectName}</p>
          </span>
        </Modal>
      </ConfigProvider>

      <Table
        size="small"
        columns={columns}
        dataSource={filteredProjects}
        onChange={onChange}
        scroll={{ y: 200 }}
      />
    </div>
  );
}