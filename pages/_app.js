import { MantineProvider } from '@mantine/core'
import { Navigation } from '../components/navigation'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // create a mantine provider
  return (
    <div>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500&display=swap" rel="stylesheet"></link>  
      </Head>
    <MantineProvider         
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}>
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
    </MantineProvider>
    </div>
  )
}

export default MyApp
