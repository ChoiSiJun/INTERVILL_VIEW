import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const AxiosUtill = () => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOME_API,
    timeout: 3000,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      // 오류 처리
      if (error.response) {
        // 서버 응답 오류 처리
        switch (error.response.status) {
          case 401:
            navigate('/login');
            break;
          case 403:
            navigate('/error/authDefine');
            break;
          default:
            navigate('/error/ServerError');
            break;
        }
      } else {
        // 기타 오류 처리
        console.log('Error:', error.message);
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default AxiosUtill;
