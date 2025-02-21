import { httpInstance } from '@/apis/config/httpInstance';
import useUserStore from '@/store/userStore';
import { theme, themeColors } from '@/theme/theme';
import { ApiMessages, ROUTE, ValidationMessages } from '@/utils/constants';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import cn from 'classnames';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputComponent from '../components/InputComponent';
import styles from './login.module.css';

const Login: React.FC = () => {
  const methods = useForm<LoginFormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors }
  } = methods;
  const navigate = useNavigate();
  const { login } = useUserStore();

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
        toast.error(error.response?.data?.message || ApiMessages.Error.common);
      } else {
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
          className={cn(styles.loginForm, (errors?.password || errors?.email) && styles.loginFormError, 'glassBackground')}
        >
          <LockIcon className={styles.lockIcon} />
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
            fullWidth
            sx={{
              mt: 3,
              padding: '15px 0'
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
