import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ModuleSlice from '@common/slice/ModuleSlice';
import SurveyEditInfoSlice from '@module/survey/slice/SurveyEditSlice';

import QuestionApi from '@module/survey/slice/QustionEditApi';
import SurveyInfoListoSlice from '@module/survey/slice/SurveyListSlice';
import AuthProcessSlice from '@features/auth/authSlice';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth'],
};

const reducers = combineReducers({
  Auth: AuthProcessSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: {
    persistedReducer,
    Module: ModuleSlice,
    SurveyEditInfo: SurveyEditInfoSlice,
    qstnApi: QuestionApi.reducer,
    SurveyInfoList: SurveyInfoListoSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(QuestionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
