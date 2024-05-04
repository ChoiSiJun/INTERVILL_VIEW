
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import QuestionEditor from '@module/survey/components/tap/QuestionEditor'
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { ModalHandler } from './DocumentEditor';

interface messageConfig {
    showTitle? : boolean;
    showConfirm? : boolean;
    showCancel? : boolean;
}

interface qustionCard {
    id : string;
    title? : string;
    content? : string;
    placeholder? : string;
    modalHandler : ModalHandler;
}

export default function QuestionCard({ id, title, content, placeholder, modalHandler} : qustionCard) {
  const cardRef = useRef(null);

  const qustionEditOpen = () => {
    console.log("id", id);
    if(modalHandler){
      modalHandler.open(id);
    }else {
      console.error("modalHandler is undefined");
      //TODO 모달핸들러가 없어서 오픈못했을 경우에 오류처리 필요. 
    }

  }

  return (
    <Card key={id} ref={cardRef} sx={{ minWidth: 275, maxWidth:'70%', marginTop:3, marginLeft:0 }} onClick={qustionEditOpen}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {title}
        </Typography>
        <Typography variant="h5" component="div">
          {content}
        </Typography>
        <Typography variant="body2">
          {placeholder}
        </Typography>
      </CardContent>
    </Card>
  );
}