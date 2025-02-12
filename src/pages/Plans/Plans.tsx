import { httpInstance } from '@/apis/config/httpInstance';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Avatar, Box, Button, Card, Chip, Switch, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddTaskForm from './AddTaskForm';

const localizer = momentLocalizer(moment);

export default function Plans() {
  const [isMonth, setIsMonth] = useState(false);
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState<Day[]>([]);
  const handleToggle = () => setIsMonth(!isMonth);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await httpInstance.get('/tasks');
  //       console.log(response.data);
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //       setTasks([]);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  // const Task = async (data: any) => {
  //   try {
  //     const response = await httpInstance.post('/tasks', data);
  //     setTasks([...tasks, response.data]);
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //   }
  // };

  const initialTasks: Day[] = [
    {
      day: 'Monday',
      taskList: [
        { id: '1', priority: 'Low', description: 'Plan weekly tasks', tags: ['Web'], date: new Date(2024, 9, 23) },
        { id: '2', priority: 'Medium', description: 'Team sync-up', tags: ['Meeting'], date: new Date(2024, 9, 23) },
        { id: '3', priority: 'High', description: 'Fix production bug', tags: ['Bug'], date: new Date(2024, 9, 23) }
      ],
      tags: undefined,
      priority: undefined,
      date: undefined,
      description: undefined,
      tasks: undefined
    },
    {
      day: 'Tuesday',
      taskList: [
        { id: '4', priority: 'Low', description: 'Write documentation', tags: ['Documentation'], date: new Date(2024, 9, 24) },
        { id: '5', priority: 'High', description: 'Client presentation', tags: ['Client', 'Presentation'], date: new Date(2024, 9, 24) },
        { id: '6', priority: 'Medium', description: 'Code review', tags: ['Code'], date: new Date(2024, 9, 24) }
      ],
      tags: undefined,
      priority: undefined,
      date: undefined,
      description: undefined,
      tasks: undefined
    },
    {
      day: 'Wednesday',
      taskList: [
        { id: '7', priority: 'Medium', description: 'Develop feature X', tags: ['Development'], date: new Date(2024, 9, 25) },
        { id: '8', priority: 'Low', description: 'Research new tools', tags: ['Research'], date: new Date(2024, 9, 25) },
        { id: '9', priority: 'High', description: 'Security review', tags: ['Security'], date: new Date(2024, 9, 25) }
      ],
      tags: undefined,
      priority: undefined,
      date: undefined,
      description: undefined,
      tasks: undefined
    }
  ];

  const events = initialTasks?.map((task) => ({
    title: task.description,
    start: task.date,
    end: task.date,
    priority: task.priority,
    tags: task.tags
  }));
  console.log(events);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    const sourceDay = initialTasks.find((day) => day.day === source.droppableId);
    const destinationDay = initialTasks.find((day) => day.day === destination.droppableId);

    if (sourceDay && destinationDay) {
      const [movedTask] = sourceDay.taskList.splice(source.index, 1);
      destinationDay.taskList.splice(destination.index, 0, movedTask);
    }
  };

  const handleAddTask = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Box sx={{ m: 'auto', minHeight: '100vh' }}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
        p={2}
        sx={{ backgroundColor: '#F4F6F6', borderRadius: '12px' }}
      >
        <Typography variant='h5' fontWeight='600'>
          {isMonth ? 'Monthly Plans' : 'Weekly Plans'}
        </Typography>
        <Box display='flex' alignItems='center' gap={1}>
          <Button
            onClick={handleAddTask}
            variant='outlined'
            size='small'
            sx={{ borderRadius: '', textTransform: 'none', borderColor: '#F4F6F6' }}
          >
            Add Task
          </Button>
          <Switch color='primary' checked={isMonth} onChange={handleToggle} />
        </Box>
      </Box>
      <AddTaskForm open={modal} onClose={handleCloseModal} onAddTask={handleAddTask} />
      <Grid container spacing={3}>
        {!isMonth ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            {tasks.map((day) => (
              <Droppable droppableId={day.day} key={day.day}>
                {(provided) => (
                  <Grid item xs={12} sm={6} md={4} ref={provided.innerRef} {...provided.droppableProps}>
                    <Box p={2} sx={{ backgroundColor: '#F4F6F6', borderRadius: '12px', minHeight: '100vh' }}>
                      <Typography variant='h6' gutterBottom>
                        {day.day}
                      </Typography>
                      {day.taskList.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ mb: 2, p: 2 }}>
                              <Box display='flex' justifyContent='space-between' mb={1}>
                                <Chip
                                  label={task.priority}
                                  color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'}
                                  size='small'
                                />
                              </Box>
                              <Typography>{task.description}</Typography>
                              <Box display='flex' gap={1}>
                                {task.tags.map((tag, i) => (
                                  <Chip key={i} label={tag} color={tag === 'Mobile' ? 'primary' : 'secondary'} size='small' />
                                ))}
                              </Box>
                              <Typography>{task.date.toLocaleDateString()}</Typography>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  </Grid>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        ) : (
          <Grid item xs={12}>
            <Box sx={{ height: 600 }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{ height: '100%', backgroundColor: '#fff' }}
                defaultView={isMonth ? 'month' : 'week'}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
