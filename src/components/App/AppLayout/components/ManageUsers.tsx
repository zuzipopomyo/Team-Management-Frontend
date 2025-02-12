import { httpInstance } from '@/apis/config/httpInstance';
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [updatedData, setUpdatedData] = useState<any>({});

  interface UserData {
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
        } else {
          console.error('Error fetching users:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Open the Edit dialog
  const openEditDialog = (user: any) => {
    setSelectedUser(user);
    setUpdatedData({ name: user.name, email: user.email, role: user.role });
    setOpenEditModal(true);
  };

  // Close the Edit dialog
  const closeEditDialog = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
    setUpdatedData({});
  };

  // Validate input fields
  const validateInputs = () => {
    return updatedData.name && updatedData.email && updatedData.role;
  };

  // Handle Edit
  const handleEdit = async () => {
    if (!validateInputs()) {
      console.error('Validation failed: All fields are required');
      return;
    }
    try {
      const response = await httpInstance.patch(`/users/${selectedUser.id}`, updatedData);
      setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? { ...user, ...response.data } : user)));
      console.log(`User with ID: ${selectedUser.id} updated successfully.`);
      closeEditDialog();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`Error editing user with ID: ${selectedUser.id}`, error.response.data);
      } else {
        console.error('Error editing user:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await httpInstance.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      console.log(`User with ID: ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID: ${id}`, error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUpdatedData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderRoleChip = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Chip label='Admin' color='primary' />;
      case 'USER':
        return <Chip label='User' color='secondary' />;
      default:
        return <Chip label='Unknown' color='default' />;
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{renderRoleChip(user.role)}</TableCell>
                <TableCell>
                  <Button variant='outlined' color='secondary' onClick={() => openEditDialog(user)}>
                    Edit
                  </Button>
                  <Button variant='outlined' color='error' onClick={() => handleDelete(user.id)} style={{ marginLeft: '8px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditModal} onClose={closeEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Name'
            value={updatedData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Email'
            value={updatedData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Role'
            value={updatedData.role || ''}
            onChange={(e) => handleInputChange('role', e.target.value)}
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEdit} color='secondary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
