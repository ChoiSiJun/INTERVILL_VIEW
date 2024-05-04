import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DocumentEditor from '@module/survey/components/tap/DocumentEditor';
import { useAppSelector } from '@config/ReduxHooks';

export default function DocumentTap() {
  const [value, setValue] = React.useState('1');
  const surveyEditInfo = useAppSelector(state => {
    return state.SurveyEditInfo;
    });
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="설문지 작성" value="1" />
            <Tab label="미리보기" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <DocumentEditor />
        </TabPanel>
        <TabPanel value="2">미리보기</TabPanel>
      </TabContext>
    </Box>
  );
}
