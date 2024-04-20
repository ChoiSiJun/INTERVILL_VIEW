import { Toolbar } from '@mui/material';
import ContentTitle from '@common/components/atoms/text/ContentTitle';
import { ReactNode } from 'react';

export interface ToolbarContentProps {
  buttonList: ReactNode[];
}

const ToolbarContent = ({ buttonList }: ToolbarContentProps) => {
  return (
    <Toolbar>
      <ContentTitle />
      {buttonList}
    </Toolbar>
  );
};

export default ToolbarContent;
