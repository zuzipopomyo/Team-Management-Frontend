import { AuthContext } from '@/contexts/AuthContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: '#ffffff',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Navbar = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');

  //   navigate('/login', { replace: true });
  // };

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon sx={{ color: 'gray' }} />
        </IconButton>
        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, color: 'gray' }}></Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton onClick={logout} color='inherit'>
            <ExitToAppIcon sx={{ color: 'gray' }} />
          </IconButton>
          <Typography color={'black'} variant='subtitle1'>
            {user?.name}
          </Typography>
          <NotificationsActiveOutlinedIcon sx={{ color: 'gray' }} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
