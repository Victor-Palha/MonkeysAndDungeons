import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"/>
      <Component {...pageProps} />
    </>
  )
}
