import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import store from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextTopLoader from "nextjs-toploader";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextTopLoader />
      <Navbar/>
      <Component {...pageProps} />
      <ToastContainer/>
      <Footer/>
    </Provider>
  )
}
