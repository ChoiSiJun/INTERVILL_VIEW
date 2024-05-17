import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import UserInfoBox from './UserInfoBox';

const SideBarHeader = () => {
  const theme = useTheme(); // 테마 객체를 가져옵니다.
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: 'flex',
            flexDirection: 'row', // 이미지와 텍스트를 가로로 정렬합니다.
            borderRadius: '10px',
            backgroundColor: 'transparent',
            width: '100%',
            color: theme.palette.text.primary, // 텍스트 색상을 흰색으로 설정합니다.
            borderColor: theme.palette.divider, // 테두리 색상을 검은색으로 설정합니다.
            borderWidth: '2px', // 테두리 두께를 설정합니다.
            borderStyle: 'solid', // 테두리 스타일을 설정합니다.
          }} // 모서리를 둥글게 만듭니다.
          endIcon={<ArrowDropDownIcon />} // 버튼 오른쪽에 화살표 아이콘을 추가합니다.
        >
          <Box
            sx={{
              width: '60px',
              height: '40px',
              borderColor: theme.palette.divider,
              borderWidth: '2px',
              borderStyle: 'solid',
              margin: '3px 10px 3px 3px',
            }}
          >
            <AccessibilityIcon />
          </Box>

          <Box
            sx={{
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1" align="left">
              Workspace
            </Typography>
            <Typography variant="h6" align="left">
              이용자관리
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default SideBarHeader;
