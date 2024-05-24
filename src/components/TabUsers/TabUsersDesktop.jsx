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
import {  useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsersDesktop() {
  let { usersRedux } = useSelector((state) => state.usersManageReducer);

  const [userData, setUserData] = useState();
  const [randomNumber, setRandomNumber] = useState(11);
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    setUserData(usersRedux);

  }, []);

  useEffect(() => {
    usersManageService
      .getUsersList()
      .then((result) => {

        setUserData(result.data.content);

      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [randomNumber]);


  // Drawer Edit
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState("");



  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
  };
  const onClose = () => {

    setOpen(false);
  };
  const onFinish = (values) => {

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
  let [filteredValue] = useState();

  useEffect(() => {
    if (userData) {
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
    const newData = gridData.find((item) => item.userId == id);
    setUser(newData);
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
      title: "Email",
      dataIndex: "email",

      width: 200,
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
                () => handleEdit(record.userId)}
            ></Button>
            <Button
              type="text"
              className="btnRed"
              icon={<DeleteOutlined />}
              onClick={() => {
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
