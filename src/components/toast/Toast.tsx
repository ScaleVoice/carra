import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToastWrapper() {
  return (
    <ToastContainer
      toastClassName="ticking_app_toast"
      theme="colored"
      position="bottom-left"
    />
  )
}
