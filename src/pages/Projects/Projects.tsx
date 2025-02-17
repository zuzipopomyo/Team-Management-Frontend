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

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface Project {
  id?: string;
  name: string;
  description: string;
  isActive?: boolean;
  tasks?: Task[];
}

const ProjectsTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({ name: '', description: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await httpInstance.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (user.role !== 'MANAGER') {
      alert('Only managers can add projects.');
      return;
    }

    try {
      const response = await httpInstance.post('/projects', newProject, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      console.log(newProject);
      setProjects((prev) => [...prev, response.data]);
      setNewProject({ name: '', description: '' });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding project:', error);
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

  const handleEditProject = async () => {
    if (projectToEdit) {
      try {
        const response = await httpInstance.put(`/projects/${projectToEdit.id}`, projectToEdit);
        setProjects((prev) => prev.map((project) => (project.id === projectToEdit.id ? response.data : project)));
        setProjectToEdit(null);
        setOpenEditDialog(false);
      } catch (error) {
        console.error('Error editing project:', error);
      }
    }
  };

  const openEditDialogHandler = (project: Project) => {
    setProjectToEdit(project);
    setOpenEditDialog(true);
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
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProject} variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          {projectToEdit && (
            <>
              <TextField
                fullWidth
                label='Project Name'
                value={projectToEdit.name}
                onChange={(e) => setProjectToEdit({ ...projectToEdit, name: e.target.value })}
                margin='dense'
              />
              <TextField
                fullWidth
                label='Description'
                value={projectToEdit.description}
                onChange={(e) => setProjectToEdit({ ...projectToEdit, description: e.target.value })}
                margin='dense'
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditProject} variant='contained'>
            Save
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
                    <Button onClick={() => openEditDialogHandler(project)}>Edit</Button>
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
