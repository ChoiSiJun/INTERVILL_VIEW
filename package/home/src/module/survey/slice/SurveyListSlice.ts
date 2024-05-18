import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps } from '@common/type/commonType';
import axios, { AxiosResponse, AxiosError } from 'axios';
import QuestionApi from './QuestionEditApi';
import { SurveyM } from './SurveyEditSlice';

const api_url = import.meta.env.VITE_HOME_API;

export interface SurveyInfoRow {
  id : string;
  rowIndex : number;
  title : string;
  frstRgstDttm : string;
  lastUpdtDttm : string;
  qstnSize : number;
}


interface SurveyListResponse {
  surveyInfoList : SurveyInfoRow [];
  page : number;
  size : number;
  first : boolean;
  last : boolean;
  totalElements : number;
  totalPages : number;
  isLoading : boolean;
}

const initialState: SurveyListResponse = {
  surveyInfoList: [],
  page : 0,
  size : 10,
  isLoading : false
};



export interface SurveyListInquriyRequest{
  providerId : string;
  startDate : string;
  endDate : string;
  page : number;
  size : number;
  orderBy : string,
  sort : string,
}

export const surveyListInquiryReqThunk = createAsyncThunk<
  Record<string, string | number | null>[],
  SurveyListInquriyRequest,
  { rejectValue: AsyncThunkErrorProps }
>('SurveyInfoList', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SurveyListInquriyRequest; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData = await axios.post(
      `${api_url}/survey/v1/inqSurveyInfoList`
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

export const SurveyInfoListSlice = createSlice({
    // slice 이름정의
    name: 'SurveyInfoList',
    // 초기값 세팅
    initialState,
    // 리듀서 기입
    reducers: {},
    extraReducers: (builder) => {
      builder
        /**
         * 설문지 관련 API
         */
        .addCase(surveyListInquiryReqThunk.pending, (state) => {
          console.log('pending...', state);
          state.isLoading = true;
        })
        .addCase(surveyListInquiryReqThunk.fulfilled, (state, {payload}) => {
          console.log("payload ::", payload);
          let rowIndex = (payload.surveyList.pageable.pageNumber * payload.surveyList.pageable.pageSize) + 1
          const surveyInfoList = payload.surveyList.content.map((data) => {
            let row = {};
            row.id = data.id;
            row.title = data.svyTitle;
            row.rowIndex = rowIndex;
            row.lastUpdtDttm = data.lastUpdtDttm;
            row.frstRgstDttm = data.frstRgstDttm;
            row.qstnSize = data.qstnM.length;
            rowIndex += 1;
            return row;
          });
          state.surveyInfoList = surveyInfoList;
          state.page = payload.surveyList.pageable.pageNumber;
          state.size = payload.surveyList.pageable.pageSize;
          state.first = payload.surveyList.first;
          state.last = payload.surveyList.last;
          state.totalElements = payload.surveyList.totalElements;
          state.totalPages = payload.surveyList.totalPages;
          state.isLoading = false;
        })
        .addCase(surveyListInquiryReqThunk.rejected, (state, action) => {
          console.error(e);
          state.isLoading = true;
          //TODO 이용자를 이전화면으로 돌려주고, 오류에 관한 내용을 안내해 주어야함.
        });
      },
  });

export default SurveyInfoListSlice.reducer;