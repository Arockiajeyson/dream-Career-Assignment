import React from 'react'
import { createContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
const ToastCont = createContext()
export  function ToastContext({ children }) {
  return (
    <div>
            <ToastCont.Provider value={{toast}}>
                <Toaster position="top-center" gutter={8} reverseOrder={false}
                toastOptions={{
                    className:'',
                    duration:3000,
                    style:{
                        background: '#363636',
                        color: '#fff',
                    },
                    success:{
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    }
                }}
                />
                {children}
            </ToastCont.Provider>
    </div>
  )
}

export default ToastCont