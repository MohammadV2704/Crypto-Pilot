import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Exchange from './components/Exchanges/Exchange'
import Coin from './components/Coins/Coin'
import Coindetails from './components/Coindetils/Coindetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Exchange />}/>
          <Route path='/coin' element={<Coin/>}/>
          <Route path='/coins/:id' element={<Coindetails />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

