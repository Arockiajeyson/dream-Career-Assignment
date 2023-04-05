import React from 'react'
import App from './App'
import {ToastContext} from './ToastContext'
export default function AuthContext() {
  return (
    <div>
        <ToastContext>
            <App/>
        </ToastContext>
    </div>
  )
}
