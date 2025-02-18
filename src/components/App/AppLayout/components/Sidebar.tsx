import useUserStore from '@/store/userStore';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate and useLocation

const drawerWidth = 240;

const Main = styled('main')<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  // 1. Make components for each sidebar item
  //   // 2. Make routes in router file as child routes of protected routes
  //   // 3. check url and check if it contains the sidebar item values. (home, plans , history) [useLocation useParams from rrd]
  //   // 4. Onclick login on the sidebar item (redirect url to the current selected btn)
  //   // 5. change the selected to the opened url

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebarItems = [
    { title: 'Home', route: '/home' },
    { title: 'Plans', route: '/plans' },
    { title: 'Projects', route: '/projects' },
    { title: 'ManageUser', route: '/manageuser' }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider sx={{ justifyContent: 'center', alignItems: 'center' }} />
        <List>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar alt='username' src={''} sx={{ width: 120, height: 120, m: 4 }} />
            <Typography sx={{ mb: 2 }}>{user?.name}</Typography>
            <Typography sx={{ mb: 3 }}>{user?.role}</Typography>
          </Box>
          <Box sx={{ justifyContent: 'center', mx: 4, mt: 5 }}>
            {sidebarItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ marginBottom: 2 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.route)}
                  sx={{
                    backgroundColor: location.pathname === item.route ? '#FEAF00' : 'transparent',
                    borderRadius: '5px'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {item.route === '/home' ? <HomeOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </List>
        <Divider />
      </Drawer>
    </Main>
  );
}
