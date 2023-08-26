/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useCallback, useState } from "react";
import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { TOAST_STATUS_LIST, ToastContext, ToastStatus } from "./Toast";

export type UseToastInput = {
  title: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  status: ToastStatus;
  setStatus: React.Dispatch<React.SetStateAction<ToastStatus>>;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  expire: number | undefined;
  setExpire: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const useToastInput = (initTitle?: string): UseToastInput => {
  const [status, setStatus] = useState<ToastStatus>('INFO');
  const [title, setTitle] = useState<string | undefined>(initTitle);
  const [expire, setExpire] = useState<number | undefined>();

  const onChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setStatus(e.target.value as ToastStatus);
    },
    [],
  );

  return {
    title,
    setTitle,

    status,
    setStatus,
    onChangeStatus,

    expire,
    setExpire,
  };
};

export const ToastInputContext = createContext<UseToastInput>({
  title: undefined,
  setTitle: (
    _arg: (string | undefined) | ((value: string | undefined) => void),
  ): void => {},

  status: 'INFO',
  setStatus: (_arg: ToastStatus | ((value: ToastStatus) => void)): void => {},
  onChangeStatus: (_e: React.ChangeEvent<HTMLSelectElement>): void => {},

  expire: undefined,
  setExpire: (
    _arg: (number | undefined) | ((value: number | undefined) => void),
  ): void => {},
});


export const ToastInputProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const { children } = props;
  const input = useToastInput("let's toast on fun stuff");

  return (
    <>
      <ToastInputContext.Provider value={input}>
        <>{children}</>
      </ToastInputContext.Provider>
    </>
  );
};

export const getToastInputTitleExample = (status: ToastStatus): string => {
  const titleOptionList: { status: ToastStatus; title: string }[] = [
    { status: 'INFO', title: 'check this out' },
    { status: 'WARNING', title: 'look out' },
    { status: 'SUCCESS', title: 'happy for you' },
    { status: 'ERROR', title: 'get well soon' },
  ];
  const [titleOption] = titleOptionList.filter((c_i) => c_i.status === status);
  return titleOption.title;
};

export const ToastInput = (): JSX.Element => {
  const toastContext = useContext(ToastContext);
  const toastInputContext = useContext(ToastInputContext);

  const { addToast } = toastContext;
  const { title, status, onChangeStatus, setTitle, expire, setExpire } =
    toastInputContext;

  return (
    <div
      style={{
        borderRadius: '0.5rem',
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        padding: '10px 20px',
      }}
    >
      <h1 className="text-3xl font-bold my-8">Toast Notification Examples</h1>
      <div
        style={{
          display: 'grid',
          justifyItems: 'start',
          gap: '20px',
        }}
      >
        <div style={{ width: '100%' }}>
          <select
            value={status}
            onChange={(e) => {
              onChangeStatus(e);
              setTitle(
                getToastInputTitleExample(e.target.value as ToastStatus),
              );
            }}
            style={{ width: '100%' }}
          >
            {TOAST_STATUS_LIST.map((status_i) => (
              <option key={status_i} value={status_i} style={{ width: '100%' }}>
                {status_i}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: '100%' }}>
          <input
            type="text"
            value={title ?? ''}
            placeholder="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ width: '100%' }}>
          <input
            type="number"
            value={expire ?? ''}
            placeholder="expire time"
            style={{ width: '100%' }}
            onChange={(e) => setExpire(parseInt(e.currentTarget.value, 10))}
          />
        </div>
        <div style={{ justifySelf: 'end' }}>
          <button
            style={{ width: '100%' }}
            onClick={() => {
              addToast({ id: uuidv4(), title, status, expire });
            }}
          >
            toast
          </button>
        </div>
      </div>
    </div>
  );
};
