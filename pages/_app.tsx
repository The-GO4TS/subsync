import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CustomProvider } from 'rsuite';
import {AuthProvider} from "./FirebaseAuthContext";


export default function App({ Component, pageProps }: AppProps) {

  return(
    <AuthProvider>
      <CustomProvider theme="dark">
        <Component {...pageProps} />
      </CustomProvider>
    </AuthProvider>
  );
}
