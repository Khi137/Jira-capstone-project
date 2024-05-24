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
export default function TabProjectsTablet() {
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
  
  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        setCategory(res.data.content);
      })
      .catch((err) => {});
  }, []);

  //update project when delete
  useEffect(() => {
    projectService
      .getProjectList()
      .then((result) => {
         dispatch(setProjectData(result.data.content));

        setProjectDataCom(result.data.content);
      
      })
      .catch((err) => {
      });
  }, [randomNumber]);
  useEffect(() => form.resetFields(), [project]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {

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
  };

  const [projectDataReduxById, setProjectDataReduxById] = useState([]);

  //lấy data redux
  useEffect(() => {

    if (projectDataRedux) {
      const projectDataReduxById = projectDataRedux.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataCom(projectDataRedux);
      setProjectDataReduxById(projectDataReduxById);
    }
  }, [projectDataRedux]);

  // call api data
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

    if (checked == true) {
      setToggle(true);
    } else if (checked == false) {
      setToggle(false);
    }
  };

  // Modal Delete
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
      width: 160,
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
      title: "Category",
      dataIndex: "categoryName",
      width: 150,
      render: (text) => <p style={{ color: "#252935" }}>{text}</p>,
    },
    {
      title: "Members",

      render: (text, record, index) => {
        return (
          <div>
            <Avatar.Group
              maxCount={3}
              maxPopoverTrigger="click"
              size="medium"
              maxStyle={{
                color: "white",
                backgroundColor: "#A2987A",
                cursor: "pointer",
              }}
            >
              {record.members?.map((member, index) => {
                return (
                  <Popover
                    key={index}
                    placement="top"
                    title="Member"
                    content={() => {
                      return (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Avatar</th>
                              <th>Name</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.members?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.userId}</td>
                                  <td>
                                    <img
                                      style={{ borderRadius: "50%" }}
                                      width={30}
                                      height={30}
                                      src={item.avatar}
                                      alt=""
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      );
                    }}
                  >
                    {/* <Avatar key={index} src={member.avatar}     /> */}
                    <Avatar
                      style={{
                        backgroundColor: "#B7BCCC",
                      }}
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </Popover>
                );
              })}
            </Avatar.Group>
            <Popover
              className="ml-1"
              placement="rightBottom"
              title={"Add user"}
              content={() => {
                return (
                  <div>
                    {""}
                    <AutoComplete
                      style={{
                        width: 200,
                      }}
                      onSearch={(value) => {
                        searchUser(value);
                      }}
                      placeholder="Search User"
                      options={usersRedux?.map((user, index) => {
                        return {
                          label: user.name,
                          value: user.userId.toString(),
                        };
                      })}
                      value={value}
                      onChange={(value) => {
                        setValue(value);
                      }}
                      onSelect={(value, option) => {
                        setValue(option.label);
                      }}
                    />
                  </div>
                );
              }}
              trigger="click"
            ></Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => {
        return (
          <>
            <Space size="middle">
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
                    .catch((err) => {
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
   
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
   
          >
            <Form.Item
              name="id"
              label="ID"
          
              rules={[]}
            >
              <Input
                style={{
                  borderColor: "black",

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
                style={
                  {
      
                  }
                }
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
                style={
                  {
              
                  }
                }
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
     
                  height: "50px",
                }}
                values={project?.description}
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
          <span className="flex">
            {" "}
            <p>Are you sure to delete this Project: </p>
            <p className="text-red-500  pl-1"> {deleteProject?.projectName}</p>
          </span>
        </Modal>
      </ConfigProvider>
      {toggle === true ? (
        <Table
          size="small"
          columns={columns}
          dataSource={projectDataReduxById}
          onChange={onChange}
          scroll={{
            y: 200,
          }}
        />
      ) : (
        <Table
          size="small"
          columns={columns}
          dataSource={projectData}
          onChange={onChange}
          scroll={{
            y: 200,
          }}
        />
      )}
    </div>
  );
}
