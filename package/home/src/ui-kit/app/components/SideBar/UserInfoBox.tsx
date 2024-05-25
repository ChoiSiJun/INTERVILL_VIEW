import { useAppSelector } from '@config/ReduxHooks';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';

const BoxStyled = styled(Box)(() => ({}));

const LinkStyled = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid white',
  borderRadius: '4px',
  padding: '10px 20px',
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&amp;:hover': {
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
  '&amp;:active': {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(0)',
  },
}));

const UserInfoBox = () => {
  const [userInfoPop, setUserInfoPop] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserInfoPop(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserInfoPop(null);
  };

  const UserInfoPopOpen = Boolean(userInfoPop);
  const UserInfoPopId = UserInfoPopOpen ? 'simple-popover' : undefined;

  const userInfo = useAppSelector(state => state.persistedReducer.Auth);
  if (userInfo.loginResult) {
    return (
      <BoxStyled>
        <IconButton color="inherit" onClick={handleUserClick}>
          <AccountCircleOutlinedIcon />
          <Typography marginLeft={1}>{userInfo.loginId}</Typography>
        </IconButton>
        <Popover
          id={UserInfoPopId}
          open={UserInfoPopOpen}
          anchorEl={userInfoPop}
          onClose={handleUserClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box
            minWidth={150}
            bgcolor="#fff"
            padding={0}
            borderRadius={1}
            boxShadow={3}
          >
            <Button fullWidth>Logout</Button>
          </Box>
        </Popover>
      </BoxStyled>
    );
  } else {
    return (
      <Box>
        <LinkStyled to="/login">
          <Typography>Login</Typography>
        </LinkStyled>
      </Box>
    );
  }
};

export default UserInfoBox;
