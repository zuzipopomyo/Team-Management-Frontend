import { AuthContext } from '@/contexts/AuthContext';
import { Box } from '@mui/material';
import React, { useContext } from 'react';
export default function Home() {
  const { user } = useContext(AuthContext);
  console.log(user, 'userInfo');
  return <Box border={'1px solid'}>hello</Box>;
}
