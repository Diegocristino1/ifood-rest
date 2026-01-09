import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [deliveryData, setDeliveryData] = useState(null)
  const [paymentData, setPaymentData] = useState(null)
  const [orderData, setOrderData] = useState(null)

  const addToCart = (product, restaurant) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      }
      return [...prev, { ...product, restaurant, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    const newQuantity = Math.max(0, Math.floor(quantity || 0))
    
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev => {
      const itemExists = prev.find(item => item.id === id)
      if (!itemExists) {
        return prev
      }
      return prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.preco || 0) * (item.quantity || 0), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        deliveryData,
        setDeliveryData,
        paymentData,
        setPaymentData,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

