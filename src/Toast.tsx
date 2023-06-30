/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import './App.css';
import infoIcon from './assets/circle-info-svgrepo-com.svg';
import warningIcon from './assets/triangle-warning-svgrepo-com.svg';
import checkIcon from './assets/circle-check-svgrepo-com.svg';
import crossIcon from './assets/circle-cross-svgrepo-com.svg';
import closeIcon from './assets/cross-svgrepo-com.svg';

export type ToastStatus = 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';

export const TOAST_STATUS_LIST: ToastStatus[] = [
  'INFO',
  'WARNING',
  'SUCCESS',
  'ERROR',
];

export type ToastData = {
  id: string;
  title: string | undefined;
  status: ToastStatus;
  expire?: number;
};

export const getStatusColor = (status: ToastStatus): string => {
  const colorOptionList: { status: ToastStatus; color: string }[] = [
    { status: 'INFO', color: 'lightgrey' },
    { status: 'WARNING', color: 'yellow' },
    { status: 'SUCCESS', color: 'green' },
    { status: 'ERROR', color: 'red' },
  ];
  const [colorOption] = colorOptionList.filter((c_i) => c_i.status === status);
  return colorOption.color;
};

export const getStatusIcon = (status: ToastStatus): string => {
  const iconOptionList: { status: ToastStatus; icon: string }[] = [
    { status: 'INFO', icon: infoIcon },
    { status: 'WARNING', icon: warningIcon },
    { status: 'SUCCESS', icon: checkIcon },
    { status: 'ERROR', icon: crossIcon },
  ];
  const [iconOption] = iconOptionList.filter((c_i) => c_i.status === status);
  return iconOption.icon;
};

export type UseToast = {
  toastList: ToastData[];
  setToastList: React.Dispatch<React.SetStateAction<ToastData[]>>;
  addToast: (toast: ToastData) => void;
  delToast: (id: string) => void;

  title: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  status: ToastStatus;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const useToast = (): UseToast => {
  const [status, setStatus] = useState<ToastStatus>('INFO');
  const [title, setTitle] = useState<string | undefined>();
  const [toastList, setToastList] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: ToastData) => {
    if (toast.title == null) {
      return;
    }
    setToastList((prevToastList) => [...prevToastList, toast]);
  }, []);

  const delToast = useCallback((id: string) => {
    setToastList((prevToastList) =>
      prevToastList.filter((toast_i) => toast_i.id !== id),
    );
  }, []);

  const onChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setStatus(e.target.value as ToastStatus);
    },
    [],
  );

  return {
    toastList,
    setToastList,
    addToast,
    delToast,

    title,
    setTitle,

    status,
    onChangeStatus,
  };
};

export const ToastContext = createContext<UseToast>({
  toastList: [],
  setToastList: (
    _arg: ToastData[] | ((value: ToastData[]) => void),
  ): void => {},
  addToast: (_toast: ToastData): void => {},
  delToast: (_id: string): void => {},

  title: '',
  setTitle: (
    _arg: (string | undefined) | ((value: string | undefined) => void),
  ): void => {},

  status: 'INFO',
  onChangeStatus: (_e: React.ChangeEvent<HTMLSelectElement>): void => {},
});

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

export const Toast = (props: { toast: ToastData }): JSX.Element => {
  const { toast } = props;
  const { id, status, title, expire = null } = toast;
  const { delToast } = useContext(ToastContext);
  const statusIcon = getStatusIcon(status);

  useEffect(() => {
    if (expire == null) {
      return;
    }

    setTimeout(() => {
      delToast(id);
    }, expire);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        borderRadius: '0.5rem',
        boxShadow: [
          '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          '0 4px 6px -4px rgb(0 0 0 / 0.1)',
        ].join(', '),
        padding: '10px 20px',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.25fr 1fr 0.125fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <div>
          <img
            src={statusIcon}
            style={{
              color: 'white',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
            }}
          />
        </div>
        <div>{title}</div>
        <img
          role="button"
          onClick={() => delToast(id)}
          src={closeIcon}
          style={{
            width: '20px',
            height: '20px',
            color: 'white',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  );
};

export const TOAST_PROVIDER_POSITION_STYLE = {
  'bottom-right': { right: '10px', bottom: '10px' },
  'bottom-left': { left: '10px', bottom: '10px' },
  'top-right': { right: '10px', top: '10px' },
  'top-left': { left: '10px', top: '10px' },
};

export const ToastProvider = (props: {
  position?: keyof typeof TOAST_PROVIDER_POSITION_STYLE;
  children: React.ReactNode;
}): JSX.Element => {
  const { children, position = 'bottom-right' } = props;
  const toast = useToast();
  const { toastList } = toast;
  const position_style = TOAST_PROVIDER_POSITION_STYLE[position];

  return (
    <>
      <ToastContext.Provider value={toast}>
        <>{children}</>
        <div style={{ position: 'absolute', ...position_style }}>
          {toastList.map((toast_i) => (
            <div
              key={toast_i.id}
              style={{
                margin: '5px 10px',
                padding: '5px 10px',
              }}
            >
              <Toast toast={toast_i} />
            </div>
          ))}
        </div>
      </ToastContext.Provider>
    </>
  );
};
