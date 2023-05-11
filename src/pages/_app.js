import '@/styles/globals.css'
import { SessionUserProvider } from "../contexts/SessionUserContext";

export default function App({ Component, pageProps }) {
  return (
    <SessionUserProvider>
      <Component {...pageProps} />
    </SessionUserProvider>
  )
}
