import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import AxiosUtill from '@common/utill/AxiosUtill';

const AuthTest = () => {
  const api_url = import.meta.env.VITE_HOME_API;

  const axios = AxiosUtill();
  function authCheck(url: string | undefined) {
    const ResponseData = axios(`${api_url}/${url}`);

    console.log('권한체크 결과');
    console.log(ResponseData);
  }

  const inputData = useRef<HTMLInputElement>(null);

  const clickHandle = () => {
    console.log('권한 체크 실행!');
    const inputValue = inputData.current?.value;
    authCheck(inputValue);
  };

  return (
    <>
      <Button onClick={clickHandle}>권한 테스트</Button>
      <TextField inputRef={inputData}></TextField>
    </>
  );
};

export default AuthTest;
