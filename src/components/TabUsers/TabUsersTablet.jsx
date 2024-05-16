import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import {useSelector } from "react-redux";
import { usersManageService } from "../../service/service";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsersTablet() {
 
  let { usersRedux } = useSelector((state) => state.usersManageReducer);
  console.log("lay usersRedux",usersRedux)
  const [userData, setUserData] = useState();
  const [randomNumber, setRandomNumber] = useState(11);
  const [gridData, setGridData] = useState([]);
  console.log("🚀 ~ file: TabUsers.jsx:179 ~ TabUsers ~ gridData:", gridData);
  console.log("user data", userData);
  useEffect(() => {
    console.log("chay ueff setuserdata")
    setUserData(usersRedux);
    // setGridData(usersRedux);
  }, []);

  useEffect(() => {
    console.log("chay ueff load userlist, set user data")
    usersManageService
      .getUsersList()
      .then((result) => {
        // console.log("users list layout", result.data.content);
        // dispatch(setUsersData(result.data.content));
        setUserData(result.data.content);
        // setGridData(userData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [randomNumber]);
  // console.log("usersDataRedux", usersRedux);

  // Drawer Edit
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState("");

  // console.log("user", user);

  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
  };
  const onClose = () => {
    // form.resetFields();
    setOpen(false);
  };
  const onFinish = (values) => {
    // console.log("values", values);
    let dataEdit = {
      id: values.userId,
      passWord: values.passWord,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
    };
    usersManageService
      .editUser(dataEdit)
      .then((res) => {
        message.success("Successfully updated!");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Update failed!");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState();

  const [searchText, setSearchText] = useState("");
  // console.log("searchText", searchText);
  let [filteredValue] = useState();

  useEffect(() => {
    console.log("chay ueff khi co userData, set grid data")
    if (userData) {
      // setGridData(userData)
      filteredValue = userData.filter((value) => {
        return value.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setGridData(filteredValue);
    }
  }, [userData]);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setGridData(userData);
    } else {
      filteredValue = userData.filter((value) => {
        return value.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setGridData(filteredValue);
    }
  };
  const handleOk = () => {
    usersManageService
      .deleteUser(deleteUser.userId)
      .then((res) => {
        message.success("User deleted!");

        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      })
      .finally(setIsModalOpen(false));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => form.resetFields(), [user]);
  const handleEdit = (id) => {
    console.log("bam edit", id);
    const newData = gridData.find((item) => item.userId == id);
    console.log("newData", newData);
    setUser(newData);
    // setTimeout(() => {
    //   showDrawer();
    // }, 300);
    showDrawer();
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",

      width: 150,
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              className="btnBlue"
              type="primary"
              icon={<EditOutlined />}
              onClick={
                () => handleEdit(record.userId)
                
              }
            ></Button>
            <Button
              type="text"
              className="btnRed"
              icon={<DeleteOutlined />}
              onClick={() => {
                // console.log(record);
                setDeleteUser(record);
                setIsModalOpen(true);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div
      className=""
      //  style={{
      //   margin: '24px 16px',
      //   padding: 24,
      //   minHeight: 280,

      // }}
    >
      <ConfigProvider
        theme={{
          components: {
            Input: {
              /* here is your component tokens */
              hoverBorderColor: "#AE8EBB",
              activeBorderColor: "#AE8EBB",
            },
          },
        }}
      >
        <Input
          onChange={handleSearch}
          value={searchText}
          addonBefore={<SearchOutlined />}
          allowClear
          placeholder="Search User"
          style={{ width: 200, marginBottom: "10px" }}
        />
      </ConfigProvider>

      <Table
        size="small"
        columns={columns}
        // dataSource={gridData.length ? gridData : userData}
        dataSource={gridData}
        onChange={onChange}
        scroll={{
          y: 200,
        }}
        rowKey={"userId"}
      />
      <Drawer
        title="Edit User"
        width={300}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          form={form}
          initialValues={{
            userId: user?.userId,
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            avatar: user?.avatar,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          // layout="vertical"
        >
          <Form.Item name="userId" label="">
            <Input
              values={user?.userId}
              disabled={true}
              addonBefore="User Id:"
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            hasFeedback
          >
            <Input values={user?.name} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              { type: "email", message: "The email address is illegal!" },
            ]}
            hasFeedback
          >
            <Input values={user?.email} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
            hasFeedback
          >
            <Input values={user?.phoneNumber} />
          </Form.Item>
          <Space style={{ width: "100%", justifyContent: "center" }}>
            <Button onClick={onClose} className="btnBlue" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onClose} className="btnCancel" type="text">
              Cancel
            </Button>
          </Space>
        </Form>
      </Drawer>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        <span className="flex">
          {" "}
          <p>Are you sure to delete this user: </p>
          <p className="text-red-500  pl-1"> {deleteUser?.name}</p>
        </span>
      </Modal>
    </div>
  );
}
