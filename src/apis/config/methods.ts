import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { httpInstance } from './httpInstance';

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string, overrideConfig: AxiosRequestConfig = {}) => httpInstance.get(url, overrideConfig).then(responseBody),
  post: (url: string, body: unknown, overrideConfig: AxiosRequestConfig = {}) =>
    httpInstance.post(url, body, overrideConfig).then(responseBody),
  put: (url: string, body: unknown, overrideConfig: AxiosRequestConfig = {}) =>
    httpInstance.put(url, body, overrideConfig).then(responseBody),
  delete: (url: string, overrideConfig: AxiosRequestConfig = {}) => httpInstance.delete(url, overrideConfig).then(responseBody)
};
