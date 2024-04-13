import ReactDOM from 'react-dom/client';
import LibertyRouter from '@router';
import { Provider } from 'react-redux';
import { store } from '@config/ReduxStoreConfig';

import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@common/components/common_components_index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LibertyRouter />
    <Toast.ReactToast />
  </Provider>,
);
