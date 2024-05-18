import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps } from '@common/type/commonType';
import axios, { AxiosResponse, AxiosError } from 'axios';
import QuestionApi from './QuestionEditApi';

const api_url = import.meta.env.VITE_HOME_API;

interface SurveyResponse {
  surveyM: SurveyM;
}

export interface SurveyM {
  frstRgstDttm: string;
  frstRgstUser: string;
  lastUpdtDttm: string;
  lastUpdtUser: string;
  userId: string;
  fldrId: string;
  svySttusCod: string;
  svyStartDttm: string | null;
  svyUrl: string | null;
  svyTitle: string;
  svyPropList: string;
  svyQstnSeqList: string;
  svyProps: SurveyProperty[];
  qstnM: QuestionM[];
  useAt: string;
  updated: boolean;
  new: boolean;
  id: string;
}

export interface SurveyProperty {
  frstRgstDttm: string;
  frstRgstUser: string;
  lastUpdtDttm: string;
  lastUpdtUser: string;
  svyPropId: string;
  svyPropTypeCod: string;
  svyPropVal: string;
  useAt: string;
  updated: boolean;
  new: boolean;
  id: string;
}

export interface QuestionM {
  frstRgstDttm: string;
  frstRgstUser: string;
  lastUpdtDttm: string;
  lastUpdtUser: string;
  qstnId: string;
  qstnTypeCod: string;
  qstnTitle: string;
  qstnValue: string;
  qstnProps: any;  // 여기는 상세한 타입 정보가 더 필요하면 추가적으로 정의해야 할 수 있습니다.
  useAt: string;
  orderBy: number;
  updated: boolean;
  new: boolean;
  id: string;
}


const initialState: SurveyResponse = {
  surveyM: {
      id: "",
      userId: "",
      frstRgstDttm: "",
      frstRgstUser: "",
      lastUpdtDttm: "",
      lastUpdtUser: "",
      fldrId: "/",
      svySttusCod: "001",
      svyStartDttm: null,
      svyUrl: null,
      svyTitle: "새 설문지 제목",
      svyPropList: "",
      svyQstnSeqList: "",
      svyProps: [
          {
              frstRgstDttm: "",
              frstRgstUser: "",
              lastUpdtDttm: "",
              lastUpdtUser: "",
              svyPropId: "",
              svyPropTypeCod: "",
              svyPropVal: "",
              useAt: "Y",
              updated: false,
              new: false,
              id: ""
          }
      ],
      qstnM: [
          {
              frstRgstDttm: "",
              frstRgstUser: "",
              lastUpdtDttm: "",
              lastUpdtUser: "",
              qstnId: "",
              qstnTypeCod: "",
              qstnTitle: "",
              qstnValue: "",
              qstnProps: null,  // 상세 타입이 결정되면 이 부분을 업데이트해야 할 수 있습니다.
              useAt: "Y",
              orderBy: 0,
              updated: false,
              new: false,
              id: ""
          }
      ],
      useAt: "Y",
      updated: false,
      new: false
  }
};



interface SurveyCreateRequest{
  svyId : string;
  providerId : string;
}

export const surveyCreateReqThunk = createAsyncThunk<
  Record<string, string | number | null>[],
  SurveyCreateRequest,
  { rejectValue: AsyncThunkErrorProps }
>('SurveyCreate', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SurveyCreateRequest; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData = await axios.post(
      `${api_url}/survey/v1/create`
      ,SearchQuery
    );
    
    if (responseData.status !== 200) {
      throw new Error('응답코드 반환에러');
    }
    console.log(responseData);
    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
      errorCode: 500,
    });
  }
});


export interface SurveyInquiryRequest{
  svyId : string;
  providerId : string;
}
export const SurveyInquiryReqThunk = createAsyncThunk<
  Record<string, string | number | null>[],
  SurveyInquiryRequest,
  { rejectValue: AsyncThunkErrorProps }
>('SurveyInquiry', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SurveyCreateRequest; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData = await axios.post(
      `${api_url}/survey/v1/inqSurveyInfo`
      ,SearchQuery
    );
    
    if (responseData.status !== 200) {
      throw new Error('응답코드 반환에러');
    }
    console.log(responseData);
    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
      errorCode: 500,
    });
  }
});

export const SurveyEditInfoSlice = createSlice({
    // slice 이름정의
    name: 'SurveyEditInfo',
    // 초기값 세팅
    initialState,
    // 리듀서 기입
    reducers: {},
    extraReducers: (builder) => {
      builder
        /**
         * 설문지 관련 API
         */
        .addCase(surveyCreateReqThunk.pending, (state) => {
          console.log('pending...', state);
        })
        .addCase(surveyCreateReqThunk.fulfilled, (state, {payload}) => {
          console.log("payload ::", payload);
          state.surveyM = payload.surveyM;
        })
        .addCase(surveyCreateReqThunk.rejected, (e) => {
          console.error(e);
          //TODO 이용자를 이전화면으로 돌려주고, 오류에 관한 내용을 안내해 주어야함.
        })
        .addCase(SurveyInquiryReqThunk.pending, (state) => {
          console.log('pending...', state);
        })
        .addCase(SurveyInquiryReqThunk.fulfilled, (state, {payload}) => {
          console.log("payload ::", payload);
          state.surveyM = payload.surveyM;
        })
        .addCase(SurveyInquiryReqThunk.rejected, (e) => {
          console.error(e);
          //TODO 이용자를 이전화면으로 돌려주고, 오류에 관한 내용을 안내해 주어야함.
        })
        /**
         * 질문 관련 API
         */
        .addMatcher(QuestionApi.endpoints.addQuestion.matchPending, (state) => {
            console.log("addQuestion... matchPending");
        })
        .addMatcher(QuestionApi.endpoints.addQuestion.matchFulfilled, (state, {payload}) => {
            console.log("addQuestion... matchFulfilled");
            state.surveyM.qstnM.push(payload.qstnM);
        })
        .addMatcher(QuestionApi.endpoints.addQuestion.matchRejected, (state, {payload}) => {
          console.log("addQuestion... matchRejected");
          //TODO 사용자에게 오류 결과에 대해서 안내해주는 로직이 추가되어야 함.
        })
        .addMatcher(QuestionApi.endpoints.updQuestion.matchPending, (state) => {
          console.log("updQuestion... matchPending");
        })
        .addMatcher(QuestionApi.endpoints.updQuestion.matchFulfilled, (state, {payload}) => {
            console.log("updQuestion... matchFulfilled ::", payload);
            state.surveyM.qstnM = state.surveyM.qstnM.map((d) => d.id == payload.qstnM.id ? payload.qstnM : d)
            //state.surveyM.qstnM.push(payload.qstnM);
        })
        .addMatcher(QuestionApi.endpoints.updQuestion.matchRejected, (state, {payload}) => {
          console.log("updQuestion... matchRejected");
          //TODO 사용자에게 오류 결과에 대해서 안내해주는 로직이 추가되어야 함.
        })
        .addMatcher(QuestionApi.endpoints.delQuestion.matchPending, (state) => {
          console.log("delQuestion... matchPending");
        })
        .addMatcher(QuestionApi.endpoints.delQuestion.matchFulfilled, (state, {payload}) => {
            console.log("delQuestion... matchFulfilled ::", payload);
            state.surveyM.qstnM = state.surveyM.qstnM.filter(d => d.id != payload.qstnId );
        })
        .addMatcher(QuestionApi.endpoints.delQuestion.matchRejected, (state, {payload}) => {
          console.log("delQuestion... matchRejected");
          //TODO 사용자에게 오류 결과에 대해서 안내해주는 로직이 추가되어야 함.
        });
      },
  });

export default SurveyEditInfoSlice.reducer;