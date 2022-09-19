import { MantineProvider } from '@mantine/core'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // create a mantine provider
  return (
    <MantineProvider         
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'light',
    }}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
