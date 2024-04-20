import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import ChatPage from '@module/chat/components/ChatPage';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppContainer />}>
          <Route path=":surveyId" element={<ChatPage />} />
        </Route>
        <Route path="chat/*" element={<AppContainer />}>
          <Route path=":surveyId" element={<ChatPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
