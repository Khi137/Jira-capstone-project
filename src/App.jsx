import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabProjects from "./components/TabProjects/TabProjects";
import TabUsers from "./components/TabUsers/TabUsers";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";

import NewProject from "./components/NewProject/NewProject";
import LayoutMain from "./Layout/LayoutMain";
import Register from "./pages/LoginPage/Register";
import TabUserSetting from "./components/TabUserSetting/TabUserSetting";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <div className="jira">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<TabProjects />}></Route>
            <Route path="/users" element={<TabUsers />}></Route>
            <Route
              path="/projectdetail/:id"
              element={<ProjectDetail />}
            ></Route>
            <Route path="/newproject" element={<NewProject />}></Route>
            <Route path="/usersetting" element={<TabUserSetting />}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
