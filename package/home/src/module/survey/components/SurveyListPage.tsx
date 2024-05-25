import { Container } from '@mui/material';
import { surveyListInquiryReqThunk, SurveyListInquriyRequest } from '../slice/SurveyListSlice';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { useEffect, useState } from 'react';
import SurveyListTap from './tap/SurveyListTap';


const SurveyListPage = () => {

  return (
    <Container>
      <SurveyListTap ></SurveyListTap>
    </Container>
  );
};

export default SurveyListPage;
