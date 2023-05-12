import '@styles/globals.css'
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../layout';




const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {




  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </QueryClientProvider>
  )
}
