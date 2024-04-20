import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';

interface messageConfig {
    showTitle? : boolean;
    showConfirm? : boolean;
    showCancel? : boolean;
}

interface toUserMessage {
    title : string;
    content : string;
    placeholder : string;
    config : messageConfig;
    focus : boolean;
    confirm : (param : object) => boolean;
    cancel : (param : object) => boolean;
}

export default function ToUserQuestion({ title, content, placeholder, config, focus, confirm, cancel} : toUserMessage) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (focus && cardRef.current) {
      // focus를 주기 위해 요소에 tabIndex 속성 추가
      cardRef.current.tabIndex = -1;
      cardRef.current.focus();
    }
  }, [focus]);

  return (
    <Card ref={cardRef} sx={{ minWidth: 275, maxWidth:'70%', marginTop:3, marginLeft:0 }}>
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
      {
        ((config.showConfirm ?? false) || (config.showCancel ?? false)) &&
        (
          <CardActions>
            {
              (config.showConfirm ?? false) && (<Button size="small" onClick={confirm}>Confirm</Button>)
            }
            {
              (config.showCancel ?? false) && (<Button size="small" onClick={cancel}>Cancel</Button>)
            }
          </CardActions>
        )
      }
    </Card>
  );
}