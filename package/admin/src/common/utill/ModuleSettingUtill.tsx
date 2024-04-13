import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@config/ReduxHooks';
import { moduleAccess } from '@common/slice/ModuleSlice';

const ModuleSettingUtill = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  dispatch(moduleAccess(location));

  return <></>;
};

export default ModuleSettingUtill;
