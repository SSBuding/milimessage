import { baseUrl } from "./env";
import axios from "axios";

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})


// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        console.log(err)
        return Promise.reject()
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        } else {
            Promise.reject()
        }

    },
    err => {
        console.log(err)
        return Promise.reject()
    }
)
export default service