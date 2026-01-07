import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import Delivery from './pages/Delivery'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Cart from './components/Cart'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <GlobalStyle />
      <Router>
        <Header onCartClick={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurante/:id" element={<RestaurantDetail />} />
          <Route path="/entrega" element={<Delivery />} />
          <Route path="/pagamento" element={<Payment />} />
          <Route path="/confirmacao" element={<Confirmation />} />
        </Routes>
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </Router>
    </CartProvider>
  )
}

export default App

