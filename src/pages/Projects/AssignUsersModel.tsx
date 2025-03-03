import { httpInstance } from '@/apis/config/httpInstance';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import * as React from 'react';

const AssignUsersModel = ({
  showAssignUser,
  setShowAssignUser,
  assignedUsers,
  projectId,
  fetchProjects
}: {
  showAssignUser: boolean;
  setShowAssignUser: React.Dispatch<React.SetStateAction<boolean>>;
  assignedUsers: TUser[];
  projectId: string | null;
  fetchProjects: () => void;
}) => {
  const [users, setUsers] = React.useState<TUser[]>([]);
  const [checked, setChecked] = React.useState<string[]>([]);
  const handleToggle = (userId: string) => () => {
    const currentIndex = checked.indexOf(userId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(userId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  console.log(projectId);

  const handleAssignUnassignUser = async () => {
    if (!projectId) {
      console.error('Error: projectId is missing', projectId);
      return;
    }

    try {
      const response = await httpInstance.post('/projects/assignUnassign', {
        projectId,
        userIds: checked
      });
      console.log('response:', response);
      setShowAssignUser(false);
      fetchProjects();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server responded with:', error.response.data);
      } else {
        console.error('Error assigning users:', error);
      }
    }
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data }: { data: TUser[] } = await httpInstance.get('/users');
        if (data.length) {
          setUsers(data);
          // filter out assinged users list and set their ids to setChecked state
          const assignedUsersIds = data.filter((u) => assignedUsers?.map((aU) => aU.id)?.includes(u.id)).map((i) => i.id);
          setChecked(assignedUsersIds);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
        } else {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <Dialog open={showAssignUser} onClose={() => setShowAssignUser(false)}>
      <DialogTitle>Assign Users to this project!</DialogTitle>
      <DialogContent sx={{ width: '520px' }}>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {users.map((user) => {
            const labelId = `checkbox-list-secondary-label-${user}`;
            return (
              <ListItem
                key={user.id}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(user.id)}
                    checked={checked.includes(user.id)}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.name} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={user.email} />
                  <ListItemText id={labelId} primary={user.role} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowAssignUser(false)}>Cancel</Button>
        <Button onClick={handleAssignUnassignUser} variant='contained'>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignUsersModel;
