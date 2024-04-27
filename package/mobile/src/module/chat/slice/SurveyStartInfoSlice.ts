import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps } from '@common/type/commonType';
import axios, { AxiosResponse, AxiosError } from 'axios';

const api_url = import.meta.env.VITE_MOBILE_API;

interface Question {
  title: string;
  id: string;
  content: string;
  placeholder: string;
  type : string;
}

const sampleQuestions: Question[]= [
  { title: "프로그래밍 언어 경험"
    , id:''
    , content: "현재 사용하고 있는 프로그램 언어는 어떤것인가요?"
    , type: "001"
    , placeholder: "언어명과 사용하는 간단한 이유를 설명해주세요 \n 예)java, 취업에 유리하기 때문에" },
  { title: "개발 도구"
    , id: ''
    , content: "가장 자주 사용하는 IDE를 알려주세요."
    , type : "001"
    , placeholder: "Eclipse, Intellij, Vscode, Visual studio 등"},
  { title: "프로젝트 경험"
    , id: ''
    , content: "가장 최근에 참여했던 프로젝트는 어떤 프로젝트였나요?"
    , type : "001"
    , placeholder: "공연 예매 시스템, 금융 IT 프로젝트, 매크로 프로그램"},
  { title: "학습 방법"
    , id: ''
    , content: "학습은 어떤 방식을 선호하시나요?"
    , type : "001"
    , placeholder: "기술 문서 체크, 유튜브, 인터넷 강의, 스터디"},
  { title: "기술 동향 예측"
    , id:""
    , content: "앞으로 전망이 있어보이는 기술이나 서비스는 어떤것이라고 생각하시나요?"
    , type : "001"
    , placeholder: "AI, React, Java"},
  { title: "설문 종료"
    , id: ""
    , content: "설문에 참여해 주셔서 감사합니다."
    , type : "001"
    , placeholder: "잠시 후 완료페이지로 이동합니다."}
]


//searchMemberListThunk Request Type
interface SurveyStartRequest {
  memberId : string;
  svyId : string;
}

interface QstnProp {

}

interface Qstn {
  id : string;
  qstnTypeCod : string;
  qstnTitle : string;
  qstnValue : string;
  useAt : string;
}


interface SurveyStartInfo {
  svyId : string;
  userId : string;
  fldrId : string;
  svySttusCod : string;
  svyStartDttm : string;
  svyUrl : string;
  svyPropList : string;
  svyTitle : string;
  svyProps : string;
  svyQstnSeqList: string;
  qstnM : Qstn[];
  useAt : string;
  updated : boolean;
  questions : Question[];
  rspn : Answer;
}

interface Answer {
  id : string;
  birth : string;
  gender : string;
  identNum : string;
  identTypeCod : string;
  mobileNum : string;
  natnCod : string;
  postNum : string;
  prsnInfoAgree : string;
  svyId : string;
  telNum : string;
  useAt : string;
  userId : string;
}

const defaultRequest : SurveyStartRequest = {
  memberId : 'guestId',
  svyId : '20230522221858001002'
}


const initialState : SurveyStartInfo = {
  svyId : '',
  userId : '',
  fldrId : 'string',
  svySttusCod : 'string',
  svyStartDttm : 'string',
  svyUrl : 'string',
  svyPropList : 'string',
  svyTitle : 'string',
  svyProps : 'string',
  svyQstnSeqList: 'string',
  qstnM : [],
  useAt : 'string',
  updated : false,
  questions : sampleQuestions,
  rspn : {}
}

//비통기 통신 구현 createAsyncThunk :
//1. Member List 응답 타입
//2. Member List Axios 호출시 요청 인자 타입
//3. 추가파라미터 타입: 실패시 요청객체인 rejectValue에 대한 타입 설정

export const surveyStartInfo = createAsyncThunk<
  Record<string, string | number | null>[],
  SurveyStartRequest,
  { rejectValue: AsyncThunkErrorProps }
>('inqSurveyStartInfo', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SurveyStartRequest; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData = await axios.get(
      `${api_url}/chat/v1/inqSurveyStartInfo?${params}`,
    );
    
    if (responseData.status !== 200) {
      throw new Error('응답코드 반환에러');
    }
    console.log(responseData.data);
    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
      errorCode: 500,
    });
  }
});

export const SurveyStartSlice = createSlice({
  // slice 이름정의
  name: 'SurveyStart',
  // 초기값 세팅
  initialState,
  // 리듀서 기입
  reducers: {},
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(surveyStartInfo.pending, (state) => {
        console.log('pending...', state);
      })
      // 통신 성공
      .addCase(surveyStartInfo.fulfilled, (state, { payload }) => {

        const questionList : Question [] = payload.surveyM.qstnM.map((data, index) => {
          try{
            const placeholerProp = data.qstnProps.find(el => el.qstnPropTypeCod == '001');
            const question : Question = {
              title : data.qstnTitle,
              id : data.qstnId,
              content : data.qstnValue,
              type : data.qstnTypeCod,
              placeholder : placeholerProp ? placeholerProp.qstnPropVal : ''
            }
            return question;
          }catch(e) {
            console.error(e);
          }
        });
    
        state.questions = questionList;
        state.rspn = payload.rspnM;

        console.log(state.rspn);
      })
      // 통신 에러
      .addCase(surveyStartInfo.rejected, () => {});
  },
});

export default SurveyStartSlice.reducer;


interface ReqAnswerForQuestion {
  svyId : string;
  qstnId : string;
  rspnId : string;
  memberId : string;
  ansTypeCod : string;
  ansVal : string;
}

export const answerForQuestion = createAsyncThunk<
  Record<string, string | number | null>[],
  ReqAnswerForQuestion,
  { rejectValue: AsyncThunkErrorProps }
>('answerForQuestion', async (SearchQuery, thunkAPI) => {

  try {
    const responseData = await axios.post(
      `${api_url}/chat/v1/answerForQuestion`,
      {SearchQuery}
    );
    
    if (responseData.status !== 200) {
      throw new Error('응답코드 반환에러');
    }
    console.log(responseData.data);
    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
      errorCode: 500,
    });
  }
});