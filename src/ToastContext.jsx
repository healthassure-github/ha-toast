import { createContext, useContext } from 'react'
import { Toast } from './Toast.jsx'
import { useToastState } from './useToastState.js'

const ToastContext = createContext(null)

export const ToastProvider = ({ children, duration = 4000 }) => {
  const toast = useToastState({ duration })

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export const ToastViewport = (props) => {
  const { toastProps } = useToast()

  return <Toast {...toastProps} {...props} />
}
