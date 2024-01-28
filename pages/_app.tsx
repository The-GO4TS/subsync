import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CustomProvider } from 'rsuite';
import {AuthProvider} from "./FirebaseAuthContext";
import {NextUIProvider} from "@nextui-org/system";


export default function App({ Component, pageProps }: AppProps) {

  return(
    <AuthProvider>
        <NextUIProvider>
        <CustomProvider theme="light">
        <Component {...pageProps} />
      </CustomProvider>
        </NextUIProvider>
    </AuthProvider>
  );
}
