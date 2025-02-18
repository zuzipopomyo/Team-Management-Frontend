import { httpInstance } from '@/apis/config/httpInstance';
import { AuthContext } from '@/contexts/AuthContext';
import {
  Button,
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
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
}

interface AddProjectFormInitVal {
  name: string;
  description: string;
  projectId?: string;
}

const ProjectsTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  // newProject is used to add new project and its a form state
  const [newProject, setNewProject] = useState<AddProjectFormInitVal>({ name: '', description: '', projectId: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = React.useContext(AuthContext);

  async function fetchProjects() {
    try {
      const response = await httpInstance.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  useEffect(() => {
    fetchProjects();
  }, []);

  // is user editing or adding
  // if we have project id in our newProject, then user is editing

  const handleAddProject = async () => {
    if (user.role !== 'MANAGER') {
      alert('Only managers can add projects.');
      return;
    }

    let payload = newProject;

    if (!newProject?.projectId) {
      // this is ADD case
      payload = {
        name: newProject.name,
        description: newProject.description
      };
    }

    try {
      await httpInstance.post('/projects', payload, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      fetchProjects();
      setNewProject({ name: '', description: '' });
      setOpenDialog(false);
      newProject?.projectId ? toast.success('Project updated successfully.') : toast.success('Project added successfully.');
    } catch (error) {
      newProject?.projectId ? toast.error('Error while updating') : toast.success('Error while adding');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await httpInstance.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setNewProject({ name: project.name, description: project.description, projectId: project.id });
    setOpenDialog(true);
  };

  return (
    <>
      <Button sx={{ ml: 'auto', mb: '30px', display: 'block', border: '1px solid black', px: '30px' }} onClick={() => setOpenDialog(true)}>
        Add Project
      </Button>

      {/* Add Project Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Project</DialogTitle>
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
          <Button
            onClick={() => {
              setOpenDialog(false);
              setNewProject({ name: '', description: '', projectId: '' });
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant='contained'>
            {newProject?.projectId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Projects Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  <Typography>No projects found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(project)}>Edit</Button>
                    <Button disabled={!project.id} onClick={() => handleDeleteProject(project?.id || '')} color='error'>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectsTable;
