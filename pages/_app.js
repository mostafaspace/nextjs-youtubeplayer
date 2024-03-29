import {Layout} from '/components'
import { Provider } from 'react-redux';
import { useStore } from '../store'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return(
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
  )
}
