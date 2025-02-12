import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const AddTaskForm = ({ open, onClose, onAddTask, addnewTask }: any) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'ACTIVE',
      startDate: '',
      endDate: ''
    }
  });

  const onSubmit = (data: any) => {
    onAddTask(data);
    addnewTask(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Controller
          name='title'
          control={control}
          render={({ field }) => <TextField {...field} label='Title' fullWidth margin='normal' />}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => <TextField {...field} label='Description' fullWidth margin='normal' />}
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel>Status</InputLabel>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value='ACTIVE'>Active</MenuItem>
                <MenuItem value='PENDING'>Pending</MenuItem>
                <MenuItem value='COMPLETE'>Complete</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <TextField {...field} type='date' label='Start Date' fullWidth margin='normal' InputLabelProps={{ shrink: true }} />
          )}
        />
        <Controller
          name='endDate'
          control={control}
          render={({ field }) => (
            <TextField {...field} type='date' label='End Date' fullWidth margin='normal' InputLabelProps={{ shrink: true }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color='primary'>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;
