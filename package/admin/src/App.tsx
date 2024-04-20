import ReactDOM from 'react-dom/client';
import LibertyRouter from '@router';
import { Provider } from 'react-redux';
import { store } from '@config/ReduxStoreConfig';

import 'react-toastify/dist/ReactToastify.css';
import ReactToast from '@common/components/atoms/ReactToast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LibertyRouter />
    <ReactToast />
  </Provider>,
);
