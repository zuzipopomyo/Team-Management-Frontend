import { httpInstance } from '@/apis/config/httpInstance';
import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await httpInstance.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (editingUser) {
      try {
        await httpInstance.put(`/users/${editingUser.id}`, editingUser);
        setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
        setOpenEditModal(false);
        setEditingUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <Paper sx={{ width: '100%', marginTop: 4, overflow: 'hidden' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          User Table
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  sx={{
                    color: user.role === 'ADMIN' ? 'green' : user.role === 'USER' ? 'blue' : 'inherit'
                  }}
                >
                  {user.role}
                </TableCell>
                <TableCell>
                  <IconButton color='primary' onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Full Name'
            type='text'
            fullWidth
            value={editingUser?.name || ''}
            onChange={(e) => setEditingUser((prev) => (prev ? { ...prev, name: e.target.value } : null))}
          />
          <TextField
            margin='dense'
            label='Email'
            type='email'
            fullWidth
            value={editingUser?.email || ''}
            onChange={(e) => setEditingUser((prev) => (prev ? { ...prev, email: e.target.value } : null))}
          />
          <TextField
            margin='dense'
            label='Role'
            type='text'
            fullWidth
            value={editingUser?.role || ''}
            onChange={(e) => setEditingUser((prev) => (prev ? { ...prev, role: e.target.value as 'USER' | 'ADMIN' } : null))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManageUser;
