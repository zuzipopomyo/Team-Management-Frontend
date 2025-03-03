import { httpInstance } from '@/apis/config/httpInstance';
import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useParams } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface TUser {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  manager: TUser;
  users: TUser[];
  tasks: Task[];
}

export default function ViewProject() {
  const [value, setValue] = React.useState('1');
  const [project, setProject] = React.useState<Project | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ title: '', description: '', status: '', startDate: '', endDate: '' });
  const { projectId } = useParams();

  React.useEffect(() => {
    if (projectId) {
      fetchProjectDetails(projectId);
    }
  }, [projectId]);

  const fetchProjectDetails = async (projectId: string) => {
    try {
      const response = await httpInstance.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAddTask = async () => {
    try {
      const response = await httpInstance.post('/tasks', {
        projectId,
        ...newTask
      });
      console.log('Task added:', response.data);
      setProject((prev) => (prev ? { ...prev, tasks: [...prev.tasks, response.data] } : prev));
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box sx={{ width: '90%', typography: 'body1', pt: 5, px: 3 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <TabList onChange={handleChange} aria-label='Project Details Tabs'>
            <Tab label='Assigned Users' value='1' />
            <Tab label='Board' value='2' />
            <Tab label='Tasks' value='3' />
          </TabList>
        </Box>

        <TabPanel value='1'>
          <Card sx={{ borderRadius: '12px', boxShadow: 1, p: 3 }}>
            <Typography variant='h6' sx={{ mb: 1, fontWeight: 'bold' }}>
              Project Manager
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{project?.manager?.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Assigned Users
            </Typography>
            {project?.users.length ? (
              <Box sx={{ mt: 2 }}>
                {project.users.map((user) => (
                  <Typography key={user.id} sx={{ p: 1, borderRadius: '6px', mb: 1 }}>
                    {user.name}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: 'text.secondary' }}>No users assigned.</Typography>
            )}
          </Card>
        </TabPanel>

        <TabPanel value='2'>
          <Card sx={{ p: 3, borderRadius: '12px', boxShadow: 1 }}>
            <Typography variant='h6'>Board UI coming soon...</Typography>
          </Card>
        </TabPanel>

        <TabPanel value='3'>
          <Button sx={{ mt: 2, mb: 2 }} variant='contained' color='primary' onClick={() => setOpenDialog(true)}>
            <AddIcon sx={{ mr: 1 }} />
            Add New Task
          </Button>
          {project?.tasks.length ? (
            project.tasks.map((task) => (
              <Card key={task.id} sx={{ mb: 2, p: 2, borderRadius: '10px', boxShadow: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {task.title}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                  {task.description}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.9rem' }}>
                  Status: <strong>{task.status}</strong>
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.9rem' }}>
                  {task.startDate} - {task.endDate}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>No tasks available.</Typography>
          )}
        </TabPanel>
      </TabContext>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField label='Title' fullWidth margin='dense' onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <TextField
            label='Description'
            fullWidth
            margin='dense'
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField label='Status' fullWidth margin='dense' onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} />
          <TextField
            label='Start Date'
            type='date'
            fullWidth
            margin='dense'
            onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
          />
          <TextField
            label='End Date'
            type='date'
            fullWidth
            margin='dense'
            onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTask} variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
