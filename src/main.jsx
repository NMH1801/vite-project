import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import "@fontsource/roboto";
import 'bootstrap/dist/css/bootstrap.css';
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
