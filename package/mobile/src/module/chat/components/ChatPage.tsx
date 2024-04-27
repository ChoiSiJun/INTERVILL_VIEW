import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import ToUserQuestion from '@module/chat/components/message/ToUserQuestion'
import FromUserQuestion from '@module/chat/components/message/FromUserQuestion'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { answerForQuestion, surveyStartInfo } from '@module/chat/slice/SurveyStartInfoSlice';
import { useParams } from 'react-router-dom';

import sampleQuestions from '@module/chat/sample/questions';
import { Container } from '@mui/material';

interface Answer {
  title? : string;
  content : string;
}

const ChatPage = () => {
  //const [questions, setQuestions] = useState(sampleQuestions);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [qSequence, setQSequence] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const answerField = useRef(null);
  const surveyStart = useAppSelector(state => {
    return state.SurveyStart;
    });
  const { surveyId } = useParams();
  
  const handlerSurveyInfo = async () => {
    try {
      //멤버정보 세팅
      await dispatch(
        surveyStartInfo({
          svyId: surveyId || '',
          memberId: '' || 'guestId',
        }),
      );
      
    } catch (error) {
      console.error(error);
      console.log('오류');
    }
  };

  const handlerAnswerForQuestion = async () => {
    try {
      //멤버정보 세팅
      await dispatch(
        answerForQuestion({
          svyId: surveyStart.svyId || '',
          memberId: surveyStart.rspn.userId || 'guestId',
          rspnId: surveyStart.rspn.id || '',
          qstnId: surveyStart.questions[qSequence].id,
          ansTypeCod : surveyStart.questions[qSequence].type,
          ansVal : answerField.current.value
        }),
      );
      
    } catch (error) {
      console.error(error);
      console.log('오류');
    }
  };

  useEffect(() => {
    handlerSurveyInfo();
  }, []); // 의존성 배열이 비어있어 컴포넌트가 처음 마운트될 때만 실행됩니다.

  const submitAnswer = () => {
    if(surveyStart.questions.length == qSequence) return false;
    handlerAnswerForQuestion();
    const answer = {
      title : "",
      content:inputValue
    }
    setAnswers(prev => [...prev, answer]);
    setQSequence(qSequence+1);
    setInputValue("");
  }

  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  }

  //채팅 데이터 렌더링
  const renderChatSurvey = () => {
    return (Array.from({ length: qSequence }, (_, index) => (
      <Box key={index} sx={{width: '100%', display:'inline-block'}}>
        <ToUserQuestion title={surveyStart.questions[index].title} 
              content={surveyStart.questions[index].content} 
              placeholder={surveyStart.questions[index].placeholder}
              config={{showTitle:false, showCancel:false, showConfirm:false}}
              focus={(qSequence-1 == index)}
              confirm={() => { return false ;}}
              cancel={() => { return false; }}
              key={"question"+index}/>
        {
          (answers?.length > 0 && answers[index]) && (
            <FromUserQuestion title={""} 
                  content={answers[index]?.content } 
                  config={{showTitle:false, showCancel:false, showConfirm:false}}
                  confirm={() => { return false ;}}
                  cancel={() => { return false; }}
                  key={"answer"+index}/>
          )
        }
      </Box>
    ))
    );
  };

  return (
    <Container sx={{maxHeight: '80vh', overflow: 'auto' , paddingBottom:3}}>
        {renderChatSurvey()}
      {/* <RadioDirection /> */}
      <Box
        component="form"
        sx={{ width: '100%', position:'fixed', bottom:0 }}
        noValidate
        autoComplete="off"
      >
        <TextField sx={{width:'70%', maxHeight:270, mb:3}} 
          id="standard-basic" 
          label="Standard" 
          variant="standard" 
          value={inputValue}
          inputRef={answerField}
          onChange={handleInputChange}/>
        <Button variant="contained"
          title='submit'
          onClick={submitAnswer}>제출하기</Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
