declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare type SagaType = {
  type: string;
};

declare type TEvent<T = string> = React.ChangeEvent<HTMLInputElement & { value: T }>;

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

declare type TAutoComplete<T = unknown> = {
  value: number | string;
  label: string;
} & T?;

declare type TResponse<T> = {
  type: 'ERROR' | 'SUCCESS' | 'INFO';
  code: string;
  isNotify: boolean;
  message: string;
  result: T;
};

declare type TErrorResModel = {
  response: {
    data: {
      type: string;
      code: string;
      isNotify: boolean;
      message: string;
    };
  };
} & any;

interface LoginFormInputs {
  name?: 'string';
  email: 'string';
  password: 'string';
}
interface RegisterFormInputs {
  fullName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  password: string;
  phoneNumber: string;
}

interface Task {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  tags: string[];
  date: Date;
}

interface Day {
  tasks: any;
  tags: any;
  priority: any;
  date: any;
  description: any;
  day: string;
  taskList: Task[];
}
interface TaskCardProps {
  priority: 'Low' | 'Medium' | 'High';
  task: string;
  platforms: string[];
  date: string;
}

type TUser = {
  id: string;
  name: string;
  email: string;
  role: 'MANAGER' | 'USER';
  phoneNumber: string;
};

type TRegisterRes = {
  data: {
    user: TUser;
    tokens: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  };
};

type TLoginRes = TRegisterRes;

type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}${'' extends P ? '' : '.'}${P}` : never) : never;

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : '';

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';
