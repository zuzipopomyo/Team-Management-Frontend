import { httpInstance } from '@/apis/config/httpInstance';
import { themeColors } from '@/theme/theme';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import cn from 'classnames';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../components/InputComponent';
import styles from './register.module.css';

const Register: React.FC = () => {
  const methods = useForm<RegisterFormInputs>();
  const {
    formState: { errors }
  } = methods;
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
      const response: TRegisterRes = await httpInstance.post('auth/register', payload);
      localStorage.setItem('token', response.data.tokens.access.token);
      navigate('/');
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      toast.success('Registration successful!');
      methods.reset();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Registration failed!');
      } else {
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
          className={cn(styles.registerForm, (errors?.password || errors?.email) && styles.registerFormError, 'glassBackground')}
        >
          <PersonIcon className={styles.userIcon} />
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              // borderLeft: '6px solid #F7D542',
              paddingLeft: 1,
              fontWeight: 'bold',
              fontSize: '35px'
            }}
          >
            <Typography
              variant='h4'
              gutterBottom
              sx={{
                borderLeft: '6px solid' + themeColors.primary,
                paddingLeft: 1,
                fontWeight: 'bold',
                fontSize: '35px',
                color: themeColors.primary
              }}
            >
              Team Management
            </Typography>
          </Typography>

          {/* <InputComponent name='fullName' label='Full Name' control={methods.control} rules={{ required: 'Full Name is required' }} /> */}
          <InputComponent name='email' label='Email' control={methods.control} rules={{ required: 'Email is required' }} />
          <InputComponent
            name='password'
            label='Password'
            control={methods.control}
            type='password'
            rules={{ required: 'Password is required' }}
          />
          <InputComponent
            name='confirmPassword'
            label='Confirm Password'
            control={methods.control}
            type='password'
            rules={{ required: 'Confirm your password' }}
          />

          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id='role-label'>Role</InputLabel>
            <Controller
              name='role'
              control={methods.control}
              defaultValue='USER'
              render={({ field }) => (
                <Select {...field} labelId='role-label' value={field.value} onChange={(event) => field.onChange(event.target.value)}>
                  <MenuItem value='MANAGER'>Manager</MenuItem>
                  <MenuItem value='USER'>User</MenuItem>
                </Select>
              )}
            />
          </FormControl> */}

          <Button
            type='submit'
            variant='contained'
            sx={{
              mt: 3,
              padding: '15px 0',
              // bgcolor: '#FEAF00',
              // color: '#FFFFFF',
              // '&:hover': { bgcolor: '#FEAF00' },
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
              // color: '#FEAF00',
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
