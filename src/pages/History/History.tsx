import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
const tasks = [
  {
    day: 'Monday',
    taskList: [
      {
        priority: 'Low',
        description: 'This is task description that will wrap automatically in a new line',
        tags: ['Mobile', 'Web'],
        date: new Date(2024, 9, 23)
      },
      {
        priority: 'Low',
        description: 'Define more tasks in completion',
        tags: ['Mobile', 'Web'],
        date: new Date(2024, 9, 23)
      }
    ]
  },
  {
    day: 'Tuesday',
    taskList: [
      {
        priority: 'Medium',
        description: 'Add more user avatar',
        tags: ['Mobile', 'Web'],
        date: new Date(2024, 9, 24)
      },
      {
        priority: 'Low',
        description: 'Add pinned section at the top of the board',
        tags: ['Mobile', 'Web'],
        date: new Date(2024, 9, 24)
      }
    ]
  },
  {
    day: 'Wednesday',
    taskList: [
      {
        priority: 'High',
        description: 'Version 1 of Kanban template',
        tags: ['Mobile', 'Web'],
        date: new Date(2024, 9, 25)
      }
    ]
  }
];
const TasksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((day) =>
            day.taskList.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{day.day}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Typography
                    color={task.priority === 'High' ? 'error.main' : task.priority === 'Medium' ? 'warning.main' : 'success.main'}
                  >
                    {task.priority}
                  </Typography>
                </TableCell>
                <TableCell>{task.tags.join(', ')}</TableCell>
                <TableCell>{task.date.toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
