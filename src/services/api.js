/* eslint-disable consistent-return */
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eds.cnpt.embrapa.br/api/v1',
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@EdvMobileApp:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    // console.tron.log(error);
  }
});
export default api;
