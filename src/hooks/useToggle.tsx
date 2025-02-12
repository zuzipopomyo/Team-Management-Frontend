import { useState } from 'react';

const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};

export default useToggle;
