import { ReactNode } from 'react';

//사용할 필드 타입
export interface TableFieldProps {
  order: number;
  key: string;
  name: string;
  type: 'data' | 'button';
  buttonArray?: ReactNode;
}

export interface TableDataProps {
  [key: string]: string | number;
}

//AsyncThunk 비동기 처리에 대한 에러코드 타입
export interface AsyncThunkErrorProps {
  errorMessage: string;
}

//버튼 타입
export interface ButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}