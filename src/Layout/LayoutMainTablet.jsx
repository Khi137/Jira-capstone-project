import React, { useEffect } from "react";
import { Layout, Menu, theme, Button, Avatar, ConfigProvider } from "antd";
import {
  FileTextOutlined,
  FolderAddOutlined,
  FolderOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "../redux/action/project.js";
import {
  projectService,
  userService,
  usersManageService,
} from "../service/service.js";
import { setUsersData } from "../redux/action/userManage.js";
import { useState } from "react";
import { setInfoAction } from "../redux/action/user.js";

const { Header, Sider, Content } = Layout;
export default function LayoutMainTablet() {
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  // console.log("USER",USER)

  const dispatch = useDispatch();
  let curUser  = useSelector((state) => state.userReducer.user);
  console.log("curUSER",curUser)
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
  
    };
  }
  let handleLogout = () => {
    // xoá toàn bộ local storage
    localStorage.clear();
    // vừa chuyển trang vừa reload
    // window.location.href="/"
  };
  const items = [
    getItem(
      "Project Maganement",
      "/",
      <NavLink to="/">
        {" "}
        <UnorderedListOutlined />
      </NavLink>
    ),
    getItem(
      "Create Project",
      "/newproject",
      <NavLink to="/newproject">
        {" "}
        <FolderAddOutlined />
      </NavLink>
    ),
    getItem(
      "User Management",
      "/users",
      <NavLink to="/users">
        {" "}
        <TeamOutlined />
      </NavLink>
    ),
    ,
    getItem(
      "User Setting",
      "/usersetting",
      <NavLink to="/usersetting">
        {" "}
        <SettingOutlined />
      </NavLink>
    ),
    ,
    getItem(
      "Logout",
      "/login",
      <NavLink to="/login" onClick={handleLogout}>
        {" "}
        <LogoutOutlined />
      </NavLink>
    ),
  ];

  useEffect(() => {
    projectService
      .getProjectList()
      .then((result) => {
        // console.log("project list layout", result.data.content);
        dispatch(setProjectData(result.data.content));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  useEffect(() => {
    usersManageService
      .getUsersList()
      .then((result) => {
        // console.log("users list layout", result.data.content);
        dispatch(setUsersData(result.data.content));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      {USER ? (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} width={201} style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}>
            <div
              className="jiraLogo"
              onClick={() => {
                navigate("/");
              }}
            >
              JIRA
            </div>
           
              <Menu
              // style={{position:"fixed"}}
              selectedKeys={location.pathname}
              defaultSelectedKeys={location.pathname}
                theme="dark"
                mode="inline"
                items={items}
                // onClick={({key})=>{
                //   navigate(key)

                // }}
              />
          
          </Sider>
          <Layout
              style={{
                transition: 'all 0.2s ease-in-out',
                padding: 0,
                marginLeft: `${collapsed ? '80px' : '200px'}`,
            }}>
            <Header
              className="flex justify-between"
              style={{

                background: colorBgContainer,
                padding: '10px 20px',
                fontSize: '30px',
              }}
            >
              <Button
                className="btnTrigger btnCollapse"
                type="dashed"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  // width: 64,
                  height: 46,
                }}
              />
              <span className="flex " style={{ fontWeight: "600",fontSize:"12px" }}>
              {curUser ?  <p>{curUser?.name}</p>  : <p> {USER?.name}</p> }
              <Avatar
                  size={30}
                  className="mx-3 my-3 "
                  style={{ fontSize: "12px", color: "black",fontWeight:"400" }}
                >
                  {curUser ? curUser.name.slice(0, 2).toUpperCase() : USER?.name?.slice(0, 2).toUpperCase()  }
                </Avatar>
              </span>
            </Header>
            <Content
               style={{
                padding: 10,
                margin: '10px 10px ',
                minHeight: '300px',
                overflow: 'initial',
                backgroundColor: "#fff",
                // padding: "30px 15px",
                borderRadius: "10px",
                
            }}
            >
              {/* <div
                style={{
                  // overflow: 'scroll',
                  backgroundColor: "#fff",
                  padding: "30px 15px",
                  borderRadius: "10px",
                }}
              > */}
                <Outlet />
              {/* </div> */}
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </>
  );
}
