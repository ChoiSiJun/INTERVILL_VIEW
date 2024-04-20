import { ListSubheader, styled } from '@mui/material';
import { moduleProps } from '@common/slice/ModuleSlice';

interface NavGroupProps {
  module: moduleProps;
}

const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  fontWeight: '700',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: '26px',
  padding: '3px 12px',
}));

const NavGroup = ({ module }: NavGroupProps) => {
  return (
    <ListSubheaderStyle disableSticky>{module.moduleName}</ListSubheaderStyle>
  );
};

export default NavGroup;
