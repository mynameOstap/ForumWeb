
import './App.css'
import { Header } from './components/header'
import { SlideProvider } from './components/slideContext'
import { Home } from './pages/home'

function App() {

  return (
    <>
      <Header/>
      <SlideProvider>
      <Home/>
      </SlideProvider>
      
    </>
  )
}

export default App
