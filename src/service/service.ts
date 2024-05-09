import axios from "axios";
import type { API } from "./typing";

const BASR_URL = "http://localhost:9090";
const BASEURL_STATIC = "http://localhost:9090/static/avatar/";

const globalAxios = axios.create({
  headers: {
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/json",
    priority: "u=1, i",
  },
});

// 添加请求拦截器
globalAxios.interceptors.request.use(
  (config) => {
    // 发送请求之前
    config.headers.token = localStorage.getItem("token") || "";
    config.headers.userName = localStorage.getItem("userName") || "";
    return config;
  },
  (error) => {
    // 对请求错误
    console.log("error", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
globalAxios.interceptors.response.use(
  (response) => {
    // 对响应数据
    if (response.data.code !== 0) {
      if (response.data.code === "A000110") {
        // 用户名校验失败
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        alert("登录失效，请重新登录");
        window.location.href = "/login";
      }
    }
    return response;
  },
  (error) => {
    // 对响应错误
    console.log("error", error);
    alert("请求失败，请稍后再试");
    return Promise.reject(error);
  }
);

const userLogin = (data: API.TLogin) => {
  return globalAxios.post(`${BASR_URL}/login`, data);
};

const getUserInfo = () => {
  return globalAxios.get(`${BASR_URL}/userInfo`);
};

const register = (data: API.TRegisterInfo) => {
  return globalAxios.post(`${BASR_URL}/register`, data);
};

export { userLogin, getUserInfo, register, BASEURL_STATIC };
