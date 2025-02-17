import useUserStore from '@/store/userStore';
import { Box } from '@mui/material';
import React, { useContext } from 'react';
export default function Home() {
  const { user } = useUserStore();
  console.log(user, 'userInfo');
  return <Box border={'1px solid'}>hello</Box>;
}
