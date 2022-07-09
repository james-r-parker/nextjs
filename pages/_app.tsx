import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../src/footer';
import Header from '../src/header';
import { CssBaseline } from '@mui/material';
import theme from '../src/theme';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
