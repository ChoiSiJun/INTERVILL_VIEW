import { configureStore } from '@reduxjs/toolkit';
import ModuleSlice from '@common/slice/ModuleSlice';
import SurveyEditInfoSlice from '@module/survey/slice/SurveyEditSlice';
import QuestionApi from '@module/survey/slice/QuestionEditApi';
import SurveyInfoListoSlice from '@module/survey/slice/SurveyListSlice';

export const store = configureStore({
  reducer: {
    Module: ModuleSlice,
    SurveyEditInfo : SurveyEditInfoSlice,
    qstnApi : QuestionApi.reducer,
    SurveyInfoList : SurveyInfoListoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(QuestionApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
