import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import Item from '@ui-kit/app/components/SideBar/Item';
import Group from '@ui-kit/app/components/SideBar/Group';
import { useAppSelector } from '@config/ReduxHooks';

const ItemContainer = () => {
  //Module 정보 가져오기
  const ModuleList = useAppSelector(state => state.Module.moduleList);

  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {ModuleList.map(module => (
          <>
            <Group module={module} key={module.moduleCode} />
            {module.menuList?.map(menu => (
              <Item menu={menu} level={0} pathDirect={pathDirect} />
            ))}
          </>
        ))}
      </List>
    </Box>
  );
};
export default ItemContainer;
