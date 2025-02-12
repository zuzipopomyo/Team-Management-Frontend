import dayjs from 'dayjs';
import * as yup from 'yup';
import { ValidationMessages } from './constants';

const autoCompleteValidation = () => yup.object().shape({ label: yup.string(), value: yup.string().required() }).nullable();
const dateValidation = (field: string) => yup.date().typeError(ValidationMessages.Invalid(field)).nullable();

export const validateNumber = () => yup.number().typeError('Invalid number.').nullable();

const dateFormat = (date: string, format?: string) => dayjs(date).format(format || 'MMM YYYY');

const decimalRoundOff = (n: number) => {
  if (isNaN(n)) {
    return n;
  } else {
    const result = n - Math.floor(n) !== 0;
    if (result) return Math.round(n * 1000) / 1000;
    else return n;
  }
};

export const getInitials = (name: string, count = 3, transformUpperCase = true) => {
  const parts = name.split(' ').slice(0, count);

  let initials = '';

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
    }
  }

  return transformUpperCase ? initials.toUpperCase() : initials;
};

export default { autoCompleteValidation, dateFormat, validateNumber, decimalRoundOff, dateValidation };
