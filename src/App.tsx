/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css';
import { ToastInput, ToastInputProvider } from './ToastInput';

export const App = (): JSX.Element => {
  return (
    <ToastInputProvider>
      <ToastInput />
    </ToastInputProvider>
  );
};
