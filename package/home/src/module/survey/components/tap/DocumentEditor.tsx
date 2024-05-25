import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SurveyPropButton from '@module/survey/components/tap/SurveyPropButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { QuestionM, SurveyM } from '@module/survey/slice/SurveyEditSlice';
import { useAppSelector } from '@config/ReduxHooks';
import QuestionCard from './QuestionCard';
import QuestionApi from '@module/survey/slice/QuestionEditApi';

import QuestionEditor from './QuestionEditor';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * 설문지 속성 값 에디터
 * @returns
 */
function SuveyPropertiesGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <GridItem sx={{ padding: 0, minHeight: 37 }} elevation={0}>
            <SurveyPropButton></SurveyPropButton>
          </GridItem>
        </Grid>
        <Grid xs={9}>
          <GridItem sx={{ padding: 0 }}>
            <TextField
              sx={{ width: '100%' }}
              size="small"
              id="standard-basic"
              label="Outlined"
              variant="outlined"
            />
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  );
}

interface SuveyQuestionStackInterface {
  modalHandler: ModalHandler;
}

/**
 * 설문지 문항 목록
 * @returns
 */
function SuveyQuestionStack({ modalHandler }: SuveyQuestionStackInterface) {
  //설문지 정보
  const surveyEditInfo = useAppSelector(state => {
    return state.SurveyEditInfo;
  });
  const [addQuestion, { isLoading }] = QuestionApi.useAddQuestionMutation();
  const Questions = useAppSelector(state => state.qstnApi);

  const handleAddQuestion = () => {
    addQuestion({
      svyId: surveyEditInfo.surveyM.id,
      providerId: surveyEditInfo.surveyM.userId,
    });
  };

  /**
   * 질문 목록 컴포넌트
   * @returns
   */
  const renderQuestions = () => {
    console.log('renderQustions', surveyEditInfo.surveyM.qstnM);
    return Array.from(
      { length: surveyEditInfo.surveyM.qstnM.length },
      (_, index) => {
        return (
          <QuestionCard
            key={surveyEditInfo.surveyM.qstnM[index].id}
            id={surveyEditInfo.surveyM.qstnM[index].id}
            title={surveyEditInfo.surveyM.qstnM[index].qstnTitle}
            content={surveyEditInfo.surveyM.qstnM[index].qstnValue}
            placeholder={''}
            modalHandler={modalHandler}
          />
        );
      },
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Box>
          {renderQuestions()}
          <Box sx={{ height: 30, margin: 3 }}>
            <Button variant="contained" onClick={handleAddQuestion}>
              새 문항 추가
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export interface ModalState {
  question: QuestionM;
  open: boolean;
}

export interface ModalHandler {
  open: (questionId: string) => void;
  close: () => void;
}

/**
 * 설문지 문서 작성 화면
 * @returns
 */
export default function DocumentEditor() {
  const surveyEditInfo = useAppSelector(state => {
    return state.SurveyEditInfo;
  });

  /**
   *  질문 작성용 모달에 그려주기 위한 State객체
   */
  const [propQuestionEditor, setPropQuestionEditor] = useState<ModalState>({
    open: false,
    question: surveyEditInfo.surveyM.qstnM[0],
  });

  /**
   * 질문 작성용 모달창 핸들러
   */
  const modalHandler: ModalHandler = {
    open: (questionId: string) => {
      const questionM = surveyEditInfo.surveyM.qstnM.find(
        question => question.id == questionId,
      );
      if (questionM) {
        setPropQuestionEditor({ question: questionM, open: true });
      } else {
        console.error('questionEdit open ERROR, questionId ::', questionId);
        //TODO 만약에 문항정보를 찾을 수 없으면 오류 메세지를 표시해 주거나, 다른 처리를 통해 오류를 해결해 줘야한다.
      }
    },
    close: () => {
      setPropQuestionEditor({ ...propQuestionEditor, open: false });
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <TextField
            sx={{ width: '100%' }}
            required
            id="outlined-required"
            label="제목"
            placeholder="질문 제목을 입력해주세요."
            InputProps={{ style: { fontWeight: 600, fontSize: 18 } }}
            defaultValue={
              surveyEditInfo.surveyM ? surveyEditInfo.surveyM.svyTitle : ''
            }
          />
        </Item>
        <Item>
          <SuveyPropertiesGrid />
        </Item>
        <Item sx={{ textAlign: 'right' }}>
          <Button size="small" variant="contained" endIcon={<SendIcon />}>
            저장하기
          </Button>
        </Item>
        <Item>
          <SuveyQuestionStack modalHandler={modalHandler}></SuveyQuestionStack>
        </Item>
      </Stack>
      <QuestionEditor
        modalState={propQuestionEditor}
        setModalState={setPropQuestionEditor}
        handler={modalHandler}
      />
    </Box>
  );
}
