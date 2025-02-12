import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppLayout = ({ children }: { children: ReactElement | any }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Navbar open={open} setOpen={setOpen} />
      <Box sx={{ display: 'flex' }}>
        <Box> {open && <Sidebar open={open} setOpen={setOpen} />}</Box>
        <Box width={'100%'} height={'100%'} ml={!open ? 0 : '240px'} mt={'64px'}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default AppLayout;
