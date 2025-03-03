import { httpInstance } from '@/apis/config/httpInstance';
import InputComponent from '@/components/InputComponent';
import { Avatar, Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type FormValues = {
  email: string;
  name: string;
  role: string;
  about: string;
  address: string;
  country: string;
  phone: string;
  position: string;
};

const ProfileForm = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState<Partial<FormValues>>({}); // Fix: Use correct state name

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
      role: 'MANAGER',
      about: '',
      address: '',
      country: '',
      phone: '',
      position: ''
    }
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await httpInstance.get(`/users/${userid}`);
        console.log(response);
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userid) {
      fetchProfile();
    }
  }, [userid]);

  // Update form values when profile is updated
  useEffect(() => {
    if (profile) {
      setValue('email', profile.email || '');
      setValue('name', profile.name || '');
      setValue('role', profile.role || 'MANAGER');
      setValue('about', profile.about || '');
      setValue('address', profile.address || '');
      setValue('country', profile.country || '');
      setValue('phone', profile.phone || '');
      setValue('position', profile.position || '');
    }
  }, [profile, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Box p={3} m={4} component='form' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} display='flex' flexDirection='column' alignItems='center'>
          <Avatar sx={{ width: 120, height: 120, mb: 2 }} src='/profile.jpg' />
          <Button sx={{ mt: 3 }} variant='outlined'>
            Upload Photo
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant='h6' gutterBottom>
            Profile Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputComponent name='email' label='Email' control={control} rules={{ required: 'Email is required' }} />
            </Grid>
            <Grid item xs={6}>
              <InputComponent name='name' label='Name' control={control} rules={{ required: 'Name is required' }} />
            </Grid>
            <Grid item xs={6}>
              <Select fullWidth defaultValue='USER'>
                <MenuItem value='USER'>USER</MenuItem>
                <MenuItem value='MANAGER'>MANAGER</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputComponent name='position' label='Position' control={control} rules={{ required: 'Position is required' }} />
            </Grid>
          </Grid>

          <Typography variant='h6' gutterBottom mt={3}>
            Contact Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputComponent name='address' label='Address' control={control} />
            </Grid>
            <Grid item xs={6}>
              <InputComponent name='country' label='Country' control={control} rules={{ required: 'Country is required' }} />
            </Grid>
            <Grid item xs={6}>
              <InputComponent name='phone' label='Phone' control={control} rules={{ required: 'Phone number is required' }} />
            </Grid>
          </Grid>

          <Typography variant='h6' gutterBottom mt={3}>
            About the User
          </Typography>
          <InputComponent name='about' label='Biographical Info' control={control} rules={{ required: 'About field is required' }} />

          <Button onClick={() => navigate(`/home`)} type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 3 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
