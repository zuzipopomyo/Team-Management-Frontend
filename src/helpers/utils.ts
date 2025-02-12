import { API_CONSTANTS } from './constants';

type TAppENV = keyof typeof API_CONSTANTS;

export const getAppENV = (): TAppENV => {
  const appEnv = import.meta.env.VITE_APP_ENV;

  if (appEnv === 'QA') {
    return 'QA';
  }

  if (appEnv === 'DEV') {
    return 'DEV';
  }

  if (appEnv === 'STAGE') {
    return 'STAGE';
  }

  if (appEnv === 'PRODUCTION') {
    return 'PRODUCTION';
  }

  return 'LOCAL';
};
