import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import Dashboard from '@features/dashboard/components/template/Dashboard';
import MemberList from '@module/member/components/MemberList';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="liberty/*" element={<AppContainer />}>
          <Route path="dashBoard" element={<Dashboard />} />
          <Route path="member" element={<MemberList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
