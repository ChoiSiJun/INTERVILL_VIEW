import { useEffect } from 'react';
import { useAppDispatch } from '@config/ReduxHooks';
import { isNotEmpty } from '@common/utill/FunctionUtill';
import Cookies from 'js-cookie';
import { login } from '@features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginProcess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = Cookies.get('userInfo');

    if (isNotEmpty(userInfo)) {
      dispatch(login(userInfo));
      navigate('/');
    } else {
      console.log('로그인 인증에러');
      navigate('/');
    }
  }, [dispatch, navigate]);

  return <>로그인 처리중입니다.</>;
};

export default LoginProcess;
