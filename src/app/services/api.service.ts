import axios, { AxiosResponse } from 'axios';
import { axiosClient } from './axios-client';

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
	get: (url: string) => axiosClient.get(url).then(responseBody),
	post: (url: string, body: {}) => axiosClient.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axiosClient.put(url, body).then(responseBody),
	delete: (url: string) => axiosClient.delete(url).then(responseBody),
};