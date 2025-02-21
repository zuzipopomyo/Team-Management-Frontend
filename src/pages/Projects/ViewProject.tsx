import { httpInstance } from '@/apis/config/httpInstance';
import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, CardContent, Typography } from '@mui/material';
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
export default function ViewScreen() {
  const [value, setValue] = React.useState('1');
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const { projectId } = useParams();
  console.log('Project ID:', projectId);
  React.useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await httpInstance.get(`/tasks?projectId=${projectId}`);
      console.log('response', response);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const bull = (
    <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </Box>
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1', pt: 5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Assigned Users' value='1' />
            <Tab label='Board' value='2' />
            <Tab label='Tasks' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>Item One</TabPanel>
        <TabPanel value='2'>Item Two</TabPanel>
        <TabPanel value='3'>
          <Button sx={{ mt: 2 }} variant='contained' color='primary'>
            {' '}
            <AddIcon />
            Add New Task
          </Button>
          {tasks.map((task) => (
            <CardContent key={task.id}>
              <Typography variant='h5' component='div'>
                {task.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {task.description}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {task.status}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {task.startDate}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {task.endDate}
              </Typography>
            </CardContent>
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
