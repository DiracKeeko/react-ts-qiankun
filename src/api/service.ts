import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
export type DataType = string | number | Object;
export type ReqFulfilledType = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type ResFulfilledType = (response: AxiosResponse) => AxiosResponse['data'];
export type ResRejectedType = (error: AxiosError<{ message: string }>) => void;

// 请求体处理
const defaultReqFulfilled: ReqFulfilledType = (config) => {
  return config;
};
// 响应体处理
const defaultResFulfilled: ResFulfilledType = (response) => {
  return response.data;
};

// 响应错误处理
const defaultResRejected: ResRejectedType = async (error) => {
  console.log(error);
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/',
  timeout: 600 * 1000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};

class Service {
  private axios: AxiosInstance;

  constructor({
    config = {},
    onReqFulfilled = defaultReqFulfilled,
    onResFulfilled = defaultResFulfilled,
    onResRejected = defaultResRejected,
  }) {
    this.axios = axios.create(Object.assign({ ...defaultConfig }, config));
    this.axios.interceptors.request.use(onReqFulfilled);
    this.axios.interceptors.response.use(onResFulfilled, onResRejected);
  }

  get<T>(url: string, params?: DataType, config: AxiosRequestConfig = {}): Promise<T> {
    return this.axios.get(url, {
      params,
      ...config,
    });
  }

  post<T>(url: string, data?: DataType, config: AxiosRequestConfig = {}): Promise<{ data: T }> {
    return this.axios.post(url, data, config);
  }

  put<T>(url: string, data?: DataType, config: AxiosRequestConfig = {}): Promise<T> {
    return this.axios.put(url, data, config);
  }

  delete<T>(url: string, data?: DataType, config: AxiosRequestConfig = {}): Promise<T> {
    return this.axios.delete(url, {
      data,
      ...config,
    });
  }

  all(axiosInstances: AxiosInstance[]) {
    return axios.all(axiosInstances);
  }
}
const service = new Service({});

export default service;
