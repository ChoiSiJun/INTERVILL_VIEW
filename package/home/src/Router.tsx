import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
//import MemberList from '@module/member/components/MemberList';
import SurveyWritePage from '@module/survey/components/SurveyWritePage';
import SignInSide from '@features/auth/loginPage';
import LoginProcess from '@features/auth/loginProcess';
import AuthTest from '@features/auth/AuthTest';
import AuthDefine from '@features/error/AuthDefine';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/error/*">
          <Route path="authDefine" element={<AuthDefine />} />
        </Route>
        <Route path="/authTest" element={<AuthTest />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/loginProcess" element={<LoginProcess />} />
        ``
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
