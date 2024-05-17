import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
//import MemberList from '@module/member/components/MemberList';
import SurveyWritePage from '@module/survey/components/SurveyWritePage';
import SignInSide from '@features/auth/loginPage';
import LoginProcess from '@features/auth/loginProcess';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/loginProcess" element={<LoginProcess />} />
        <Route path="/*" element={<AppContainer />}>
          <Route path="*" element={<SurveyWritePage />} />
        </Route>
        <Route path="survey/*" element={<AppContainer />}>
          <Route path="doc/:svyId" element={<SurveyWritePage />} />
          <Route path="doc/create" element={<SurveyWritePage />} />
          <Route path="responseReport" element={<SurveyWritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
