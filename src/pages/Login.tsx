import { httpInstance } from '@/apis/config/httpInstance';
import { AuthContext } from '@/contexts/AuthContext';
import { ApiMessages, ROUTE, ValidationMessages } from '@/utils/constants';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputComponent from '../components/InputComponent';

const Login: React.FC = () => {
  const methods = useForm<LoginFormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsSubmitting(true);
    const payload = {
      email: data.email,
      password: data.password
    };

    try {
      const response: TLoginRes = await httpInstance.post('auth/login', payload);
      login(response?.data?.user || null);
      localStorage.setItem('token', response?.data?.tokens?.access?.token || '');
      navigate('/home');
      toast.success(ApiMessages.Succcess.save('User'));
      methods.reset();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || ApiMessages.Error.common);
      } else {
        console.error('Unexpected error:', error);
        toast.error(ApiMessages.Error.common);
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
            Weekly-Kanban
          </Typography>

          <InputComponent
            name='email'
            label='Email'
            type='email'
            control={methods.control}
            rules={{
              required: ValidationMessages.Required('Email')
            }}
            errorMessage={methods.formState.errors.email?.message}
          />
          <InputComponent
            name='password'
            label='Password'
            type='password'
            control={methods.control}
            rules={{
              required: ValidationMessages.Required('Password')
            }}
            errorMessage={methods.formState.errors.password?.message}
          />

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
            {isSubmitting ? 'Logging In...' : 'Login'}
          </Button>
          <Button
            variant='text'
            onClick={() => navigate('/register')}
            sx={{
              mt: 2,
              color: '#FEAF00',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Do not have an account! Register
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default Login;
