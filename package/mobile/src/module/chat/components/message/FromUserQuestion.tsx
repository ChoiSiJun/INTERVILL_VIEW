import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface messageConfig {
    showTitle? : boolean;
    showConfirm? : boolean;
    showCancel? : boolean;
}

interface fromUserMessage {
    title : string;
    content : string;
    config : messageConfig;
    confirm : (param : object) => boolean;
    cancel : (param : object) => boolean;
}

export default function FromUserQuestion({ title, content, config, confirm, cancel} : fromUserMessage) {
  return (
    <Card sx={{ maxWidth: '70%', float:'right', marginTop:3, backgroundColor:'#ffdfff', overflowWrap:'break-word' }}>
      <CardContent sx={{paddingBottom:0}}>
        <Typography sx={{ fontSize: 12, paddingBottom:0 }} color="text.secondary" gutterBottom>
         {(config.showTitle ?? false ) && title}
        </Typography>
        <Typography variant="h6" component="div">
          {content}
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