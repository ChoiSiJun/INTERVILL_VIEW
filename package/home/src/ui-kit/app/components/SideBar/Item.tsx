// mui imports
import {
  ListItemIcon,
  ListItemButton,
  List,
  styled,
  ListItemText,
  useTheme,
} from '@mui/material';

import { moduleMenuProps } from '@common/slice/ModuleSlice';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';

interface NavItemProps {
  menu: moduleMenuProps;
  level: number;
  pathDirect: string;
  onClick?: () => void;
}

const NavItem = ({ menu, level, pathDirect, onClick }: NavItemProps) => {
  const theme = useTheme();

  const NavItemStyle = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color: theme.palette.text.secondary,
    paddingLeft: '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  return (
    <List component="li" disablePadding key={menu.menuCode}>
      <Link
        to={menu.menuPath}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <NavItemStyle onClick={onClick} selected={pathDirect === menu.menuPath}>
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 0',
              color: 'inherit',
            }}
          >
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText>
            <>{menu.menuName}</>
          </ListItemText>
        </NavItemStyle>
      </Link>
    </List>
  );
};

export default NavItem;
