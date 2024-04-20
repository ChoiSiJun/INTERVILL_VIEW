import { useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HeaderBar from '@ui-kit/app/components/HeaderBar';
import SideBar from '@ui-kit/app/components/SideBar/Sidebar';

import { appTheme } from '@ui-kit/app/themes/appTheme';
import Container from '@mui/material/Container';

//라우터 Import
import { Outlet } from 'react-router-dom';

//사이드바 기본 확장 넓이
const drawerWidth: number = 270;

export default function AppContainer() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <HeaderBar
          open={open}
          setMobileSidebarOpen={setMobileSidebarOpen}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
          title={'Liberty Cloud'}
        />

        <SideBar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
