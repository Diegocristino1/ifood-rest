import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import Delivery from './pages/Delivery'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Cart from './components/Cart'
import GlobalStyle from './styles/GlobalStyle'

function AppRoutes() {
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)
  
  // Não mostrar header normal nas páginas de checkout (elas têm CheckoutHeader próprio)
  const isCheckoutPage = ['/entrega', '/pagamento', '/confirmacao'].includes(location.pathname)

  return (
    <>
      {!isCheckoutPage && <Header onCartClick={() => setCartOpen(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<RestaurantDetail />} />
        <Route path="/entrega" element={<Delivery />} />
        <Route path="/pagamento" element={<Payment />} />
        <Route path="/confirmacao" element={<Confirmation />} />
      </Routes>
      {!isCheckoutPage && <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <GlobalStyle />
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  )
}

export default App

