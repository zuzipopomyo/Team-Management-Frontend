import { httpInstance } from '@/apis/config/httpInstance';
import useUserStore from '@/store/userStore';
import { Add } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Button,
  Container,
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
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AssignUsersModel from './AssignUsersModel';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  tasks: Task[];
  users?: TUser[];
}

interface AddProjectFormInitVal {
  name: string;
  description: string;
  projectId?: string;
}

const ProjectsTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<AddProjectFormInitVal>({ name: '', description: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [showAssignUser, setShowAssignUser] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState<TUser[]>([]);

  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await httpInstance.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  const handleAddProject = async () => {
    if (user?.role !== 'MANAGER') {
      alert('Only managers can add projects.');
      return;
    }

    try {
      await httpInstance.post('/projects', newProject);
      fetchProjects();
      setNewProject({ name: '', description: '' });
      setOpenDialog(false);
      toast.success(newProject?.projectId ? 'Project updated successfully.' : 'Project added successfully.');
    } catch (error) {
      toast.error(newProject?.projectId ? 'Error while updating' : 'Error while adding');
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await httpInstance.delete(`/projects/${projectToDelete}`);
      setProjects((prev) => prev.filter((project) => project.id !== projectToDelete));
      toast.success('Project deleted successfully.');
    } catch (error) {
      toast.error('Error deleting project.');
    }
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setNewProject({ name: project.name, description: project.description, projectId: project.id });
    setOpenDialog(true);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Button
        variant='contained'
        sx={{ ml: 'auto', mb: '30px', display: 'block', border: '1px solid black', px: '30px' }}
        onClick={() => setOpenDialog(true)}
      >
        Add Project
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newProject?.projectId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Project Name'
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            margin='dense'
          />
          <TextField
            fullWidth
            label='Description'
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            margin='dense'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProject} variant='contained'>
            {newProject?.projectId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tasks counts</TableCell>
              <TableCell>Assigned Users</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  <Typography>No projects found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{project.tasks.length}</TableCell>
                  <TableCell>
                    <AvatarGroup sx={{ justifyContent: 'start' }} max={3}>
                      {project.users?.map((user) => (
                        <Avatar key={user.id} src={user.name} alt={user.name} />
                      ))}
                      <IconButton
                        onClick={() => {
                          setShowAssignUser(true);
                          setAssignedUsers(project?.users || []);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(project)}>Edit</Button>
                    <Button onClick={() => handleOpenDeleteDialog(project.id)} color='error'>
                      Delete
                    </Button>
                    <Button onClick={() => navigate(`/viewProject/${project.id}`)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showAssignUser && (
        <AssignUsersModel assignedUsers={assignedUsers} setShowAssignUser={setShowAssignUser} showAssignUser={showAssignUser} />
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsTable;
