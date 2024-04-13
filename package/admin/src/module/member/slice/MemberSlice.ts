import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps } from '@common_type';
import axios, { AxiosResponse, AxiosError } from 'axios';

const api_url = import.meta.env.VITE_MEMBER_API;

// MEMBER 정보 타입
export interface MemberDataProps {
  memberKey?: string;
  memberId: string;
  memberWebId: string;
  loginPassword: string;
  memberName: string;
  gender?: string;
  email?: string;
  mobile?: string;
  address?: string;
  address_detail?: string;
  zipcode?: string;
  state?: string;
}

// MEMBER 정보 초기값
const MemberDataInit: MemberDataProps = {
  memberKey: 'GUEST',
  memberId: '',
  memberWebId: '',
  loginPassword: '',
  memberName: '',
  gender: '',
  email: '',
  mobile: '',
  address: '',
  address_detail: '',
  zipcode: '',
  state: '',
};

// MEMEBER slice 타입
export interface MemberProps {
  memberData: MemberDataProps;
  modal: boolean;
}

// MEMBER slice 초기값
const initialState: MemberProps = {
  memberData: MemberDataInit,
  modal: false,
};

//멤버생성처리
export const createMember = createAsyncThunk<
  number,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('POST/MEMBER', async (member, thunkAPI) => {
  return await axios
    .post(`${api_url}/members/`, JSON.stringify(member), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse<MemberDataProps>) => {
      return response.status;
    })
    .catch((error: AxiosError<MemberDataProps>) => {
      return thunkAPI.rejectWithValue({
        errorMessage: error.message,
        errorCode: error.response?.status,
      });
    });
});

//멤버 수정처리
export const updateMember = createAsyncThunk<
  number,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('put/member', async (member, thunkAPI) => {
  return await axios
    .put(`${api_url}/members/`, JSON.stringify(member), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse<MemberDataProps>) => {
      return response.status;
    })
    .catch((error: AxiosError<MemberDataProps>) => {
      return thunkAPI.rejectWithValue({
        errorMessage: error.message,
        errorCode: error.response?.status,
      });
    });
});

//멤버 삭제처리
export const deleteMember = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('delete/member', async (memberKey, thunkAPI) => {
  return await axios
    .delete(`${api_url}/members/${memberKey}`)
    .then((response: AxiosResponse<MemberDataProps>) => {
      return response.data;
    })
    .catch((error: AxiosError<MemberDataProps>) => {
      return thunkAPI.rejectWithValue({
        errorMessage: error.message,
        errorCode: error.response?.status,
      });
    });
});

//멤버 정보 열기
export const openMemberModal = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('get/member', async (memberKey, thunkAPI) => {
  return await axios
    .get(`${api_url}/members/${memberKey}`)
    .then((resoponse: AxiosResponse<MemberDataProps>) => {
      return resoponse.data;
    })
    .catch((error: AxiosError<MemberDataProps>) => {
      return thunkAPI.rejectWithValue({
        errorMessage: error.message,
        errorCode: error.response?.status,
      });
    });
});

export const MemeberSlice = createSlice({
  // slice 이름정의
  name: 'memeber',

  // 초기값 세팅
  initialState,

  // 리듀서 기입
  reducers: {
    //멤버 모달 닫기
    closeMemberModal: state => {
      state.modal = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createMember.rejected, (_, { payload }) => {
        console.log(payload?.errorMessage);
      })

      // 멤버 모달 열기 성공
      .addCase(openMemberModal.fulfilled, (state, { payload }) => {
        //가지고 온 이용자 데이터 넣기
        state.memberData = payload;
        state.modal = true;
      })

      // 멤버 모달 열기 실패
      .addCase(openMemberModal.rejected, (_, { payload }) => {
        console.log(payload?.errorMessage);
      })

      // 멤버 수정 성공
      .addCase(updateMember.fulfilled, state => {
        state.modal = false;
      })

      // 멤버 수정 실패
      .addCase(updateMember.rejected, state => {
        state.modal = false;
      })

      // 멤버 삭제 성공
      .addCase(deleteMember.fulfilled, () => {})
      // 멤버 삭제 실패
      .addCase(deleteMember.rejected, (_, { payload }) => {
        console.log(payload?.errorMessage);
      });
  },
});

export const { closeMemberModal } = MemeberSlice.actions;
export default MemeberSlice.reducer;
