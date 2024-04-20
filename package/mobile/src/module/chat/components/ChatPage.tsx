import RadioDirection from '@common/components/molecule/chat/answer/RadioDirection';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ChatPage = () => {


  return (
    <>
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
      </Box> */}
        <Card sx={{ maxWidth: '70%', marginLeft:3, marginTop:3 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: '70%', float:'right', marginTop:3, marginRight:3, backgroundColor:'purple' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      
      {/* <RadioDirection /> */}
      <Box
        component="form"
        sx={{ width: '100%', position:'fixed', bottom:0 }}
        noValidate
        autoComplete="off"
      >
        <TextField sx={{width:'70%', maxHeight:270, mb:3}} id="standard-basic" label="Standard" variant="standard" />
        <Button variant="contained" title='submit'>제출하기</Button>
      </Box>
    </>
  );
};

export default ChatPage;
