
import { Container } from '@mui/material';
import { surveyCreateReqThunk, SurveyInquiryReqThunk, SurveyInquiryRequest } from '../slice/SurveyEditSlice';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { useEffect } from 'react';
import DocumentTap from '@module/survey/components/tap/DocumentTap';
import { useParams } from 'react-router-dom';


const SurveyWritePage = () => {
  const dispatch = useAppDispatch();
  const { svyId } = useParams();
  const surveyEditInfo = useAppSelector(state => {
    return state.SurveyEditInfo;
    });
    console.log("param ::", svyId);
  const handlerSurveyCreate = async () => {
    try {
      //멤버정보 세팅
      await dispatch(
        svyId ? 
        SurveyInquiryReqThunk({
          svyId: svyId ?? '',
          providerId: '' || 'guestId',
        }) : 
        surveyCreateReqThunk({
          svyId: svyId ?? '',
          providerId: '' || 'guestId',
        }),
      );
      
    } catch (error) {
      console.error(error);
      console.log('오류');
    }
  };
  useEffect(() => {
    handlerSurveyCreate();
  }, []); // 의존성 배열이 비어있어 컴포넌트가 처음 마운트될 때만 실행됩니다.

  return (
    <Container>
      <DocumentTap />
    </Container>
  );
};

export default SurveyWritePage;
