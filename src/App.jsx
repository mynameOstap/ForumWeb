
import './App.css'
import { Footer } from './components/footer'
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
      <Footer/>
      
    </>
  )
}

export default App
