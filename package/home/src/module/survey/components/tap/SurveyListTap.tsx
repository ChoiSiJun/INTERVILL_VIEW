import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAppSelector } from '@config/ReduxHooks';
import SurveyListView from './SurveyListView';

export default function SurveyListTap() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="설문지 리스트" value="1" />
            <Tab label="상세조회" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">            
            <SurveyListView />
        </TabPanel>
        <TabPanel value="2">설문지 상세조회
        //TODO 설문지 현황 및 결과를 확인 할 수 있는 페이지를 구성해야한다.
        </TabPanel>
      </TabContext>
    </Box>
  );
}
