import { createSlice } from '@reduxjs/toolkit';

interface loginInfoProps {
  loginId: string;
  loginResult: boolean;
}
const initialState: loginInfoProps = {
  loginId: '',
  loginResult: false,
};

export const AuthProcessSlice = createSlice({
  // slice 이름정의
  name: 'authProcess',
  // 초기값 세팅
  initialState,
  // 리듀서 기입
  reducers: {
    login: (state, action) => {
      try {
        const userInfo = JSON.parse(decodeURIComponent(action.payload));
        state.loginId = userInfo.user_id;
        state.loginResult = true;
      } catch (error) {
        console.log('로그인 파싱에러');
      }
    },
  },
});

export const { login } = AuthProcessSlice.actions;
export default AuthProcessSlice.reducer;
