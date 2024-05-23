import { userService } from "../../service/service";
import { SET_INFO } from "../constant/user";
import {
  message,
} from "antd";
export const loginAction = (formData, callback) => {
  //redux thunk
  return (dispatch) => {
    userService
      .login(formData)
      .then((res) => {
        console.log(res);

        localStorage.setItem("USER", JSON.stringify(res.data.content));
        //call back dùng window.location.href dùng navigate vì dùng navigate là hook ngoài component ko được
        callback();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
      });
  };
};
// ko dùng navigate được vì hook dùng trong function component

export const setInfoAction  = (payload) => ({
  type: SET_INFO,
  payload
})