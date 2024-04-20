import { configureStore } from '@reduxjs/toolkit';
import MemberSlice from '@module/member/slice/MemberSlice';
import MemberListSlice from '@module/member/slice/MemberListSlice';
import ModuleSlice from '@common/slice/ModuleSlice';

export const store = configureStore({
  reducer: {
    Module: ModuleSlice,
    Member: MemberSlice,
    MemberList: MemberListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
