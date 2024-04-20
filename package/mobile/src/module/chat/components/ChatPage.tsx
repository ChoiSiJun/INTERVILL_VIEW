import RadioDirection from '@common/components/molecule/chat/answer/RadioDirection';
import { useState } from 'react'
import Button from '@mui/material/Button';
import ToUserQuestion from '@module/chat/components/message/ToUserQuestion'
import FromUserQuestion from '@module/chat/components/message/FromUserQuestion'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import sampleQuestions from '@module/chat/sample/questions';
import { Container } from '@mui/material';

interface Answer {
  title? : string;
  content : string;
}

const ChatPage = () => {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [qSequence, setQSequence] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const submitAnswer = () => {
    if(questions.length == qSequence) return false;
    console.log(qSequence);
    console.log(answers);
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
  };
  const renderChatSurvey = () => {
    return (Array.from({ length: qSequence }, (_, index) => (
      <Box key={index} sx={{width: '100%', display:'inline-block'}}>
        <ToUserQuestion title={questions[index].title} 
              content={questions[index].content} 
              placeholder={questions[index].placeholder}
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
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
      </Box> */}
        {renderChatSurvey()}
        {/* <ToUserQuestion title={'프로그래밍 언어 경험'} 
                        content={'현재 사용하고 있는 프로그래밍 언어는 무엇인가요?'} 
                        config={{showTitle:false, showCancel:false, showConfirm:false}}
                        confirm={() => { return false ;}}
                        cancel={() => { return false; }}/>
        <FromUserQuestion title={''} 
                        content={'Java와 Python, 웹 서버를 만들기 쉽고 레퍼런스가 많이 있어서'} 
                        config={{showTitle:false, showCancel:false, showConfirm:false}}
                        confirm={() => { return false ;}}
                        cancel={() => { return false; }}/> */}
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
          onChange={handleInputChange}/>
        <Button variant="contained"
          title='submit'
          onClick={submitAnswer}>제출하기</Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
