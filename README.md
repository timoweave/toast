# introduction

Make `useToast(...)` hook to use with toast components `<Toast .../>`, toast provider `<ToastProvider .../>`, and toast context `ToastContext` .

![toast examples](./doc/toast_examples.png)

# coding

1. Add the ToastProvider and use the 
1. Add the ToastInput Example (Provider....)
1. call addToast to add toast

```
// 1. main.tsx
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider position="bottom-right">
      <App />
    </ToastProvider>
  </React.StrictMode>,
);


// 2. App.tsx (using ToastInputProvider example)
import './App.css';
import { ToastInput, ToastInputProvider } from './ToastInput';

export const App = (): JSX.Element => {
  return (
    <ToastInputProvider>
      <ToastInput />
    </ToastInputProvider>
  );
};

// 3. add Toast (using ToastInputProvider example)
export const ToastInput = (): JSX.Element => {
  const toastContext = useContext(ToastContext);
  const { addToast } = toastContext;
    
  return (
    <div>
        ...
        <button
            onClick={() => {
              addToast({ id: uuidv4(), title, status, expire });
            }}
          >
            toast
        </button>
    </div>
  );
}
```