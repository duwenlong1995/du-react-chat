import axios from "axios";

// 创建axios实例
const instance = axios.create({
  // 基本请求路径的抽取
  // baseURL:"http://xue.cnkdl.cn:23683",
  baseURL: "",
  // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
  timeout: 20000,
  // 在请求头中设置 responseType 属性
  // responseType: "arraybuffer",
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //让每个请求携带token
    let token = window.localStorage.getItem("token");
    if (token) {
      const headers = config.headers!;
      headers["Authorization"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 在请求结束时隐藏进度条
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
