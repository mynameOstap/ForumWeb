
import { Provider } from 'react-redux'
import './App.css'
import { Footer } from './components/Footer/footer'
import { Header } from './components/Header/header'
import { SlideProvider } from './components/Home/slideContext'
import { Router } from './data/router'
import { Home } from './pages/Home/home'
import {store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router/>
      </PersistGate>
      </Provider>
      
    </>
  )
}

export default App
