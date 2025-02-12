import { httpInstance } from '@/apis/config/httpInstance';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../components/InputComponent';
const Register: React.FC = () => {
  const methods = useForm<RegisterFormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormInputs) => {
    setIsSubmitting(true);
    const payload = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role
    };

    try {
      console.log('not register data', payload);
      const response: TRegisterRes = await httpInstance.post('auth/register', payload);
      console.log('Response:', response);
      localStorage.setItem('accestoken', response.data.tokens.access.token);
      navigate('/');
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      toast.success('Registration successful!');
      methods.reset();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Registration failed!');
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 6,
            bgcolor: 'white',
            borderRadius: 5,
            boxShadow: 3,
            width: '100%',
            maxWidth: '350px'
          }}
        >
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              borderLeft: '6px solid #F7D542',
              paddingLeft: 1,
              fontWeight: 'bold',
              fontSize: '35px'
            }}
          >
            Weekly-KanBan
          </Typography>

          <InputComponent name='fullName' label='Full Name' control={methods.control} rules={{ required: 'Full Name is required' }} />
          <InputComponent name='email' label='Email' control={methods.control} rules={{ required: 'Email is required' }} />
          <InputComponent
            name='password'
            label='Password'
            control={methods.control}
            type='password'
            rules={{ required: 'Password is required' }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id='role-label'>Role</InputLabel>
            <Controller
              name='role'
              control={methods.control}
              defaultValue='USER'
              render={({ field }) => (
                <Select {...field} labelId='role-label' value={field.value} onChange={(event) => field.onChange(event.target.value)}>
                  <MenuItem value='ADMIN'>ADMIN</MenuItem>
                  <MenuItem value='USER'>USER</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            sx={{
              mt: 3,
              padding: '15px 0',
              bgcolor: '#FEAF00',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#FEAF00' },
              width: '100%'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
          <Button
            variant='text'
            onClick={() => navigate('/login')}
            sx={{
              mt: 2,
              color: '#FEAF00',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Already have an account? Log in
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default Register;
