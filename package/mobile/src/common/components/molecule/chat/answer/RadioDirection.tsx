import Box from '@mui/material/Box';
import RadioGroupDirection from '@common/components/atoms/radio/RadioGroupDirection';
import Button from '@common/components/atoms/button/CreateButton'

const RadioDirection = () => {
  return (
    <Box sx={{ width: '100%', position:'fixed', bottom:0 }}>
      <Box sx={{width:'100%'}}>
        <RadioGroupDirection style={{width:'100%'}}/>
      </Box>
      <Box >
        <Button buttonName={"제출하기"}>제출하기</Button>
      </Box>
    </Box>
  );
};

export default RadioDirection;
