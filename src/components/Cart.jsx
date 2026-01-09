import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? 'fadeIn 0.3s' : 'none'};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const CartSidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background-color: var(--primary-color);
  color: var(--white);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
  }
`

const CartHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const CartItem = styled.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  gap: 16px;
`

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ItemName = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
`

const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: var(--primary-color);
`

const PriceUnit = styled.span`
  font-size: 12px;
  opacity: 0.8;
`

const PriceSubtotal = styled.span`
  font-weight: 700;
  font-size: 16px;
`

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

const QuantityButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`

const QuantityValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  align-self: flex-start;

  &:hover {
    opacity: 0.8;
  }
`

const CartFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
`

const CheckoutButton = styled.button`
  width: 100%;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const EmptyCart = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--white);
`

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const navigate = useNavigate()
  const totalItems = getTotalItems()

  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0
    return `R$ ${numPrice.toFixed(2).replace('.', ',')}`
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      onClose()
      navigate('/entrega')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <CartOverlay isOpen={isOpen} onClick={handleOverlayClick} />
      <CartSidebar isOpen={isOpen}>
        <CartHeader>
          <CartTitle>
            Carrinho {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'itens'})`}
          </CartTitle>
          <CloseButton onClick={onClose} aria-label="Fechar carrinho">&times;</CloseButton>
        </CartHeader>
        <CartItems>
          {cartItems.length === 0 ? (
            <EmptyCart>Carrinho vazio</EmptyCart>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage
                  src={item.foto || 'https://via.placeholder.com/80x80?text=Produto'}
                  alt={item.nome}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=Produto'
                  }}
                />
                <ItemInfo>
                  <ItemName>{item.nome}</ItemName>
                  <ItemPrice>
                    <PriceUnit>{formatPrice(item.preco)} cada</PriceUnit>
                    <PriceSubtotal>
                      {formatPrice((item.preco || 0) * (item.quantity || 0))}
                    </PriceSubtotal>
                  </ItemPrice>
                  <ItemQuantity>
                    <QuantityButton 
                      onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </QuantityButton>
                    <QuantityValue>{item.quantity || 0}</QuantityValue>
                    <QuantityButton 
                      onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </QuantityButton>
                  </ItemQuantity>
                </ItemInfo>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  🗑️
                </RemoveButton>
              </CartItem>
            ))
          )}
        </CartItems>
        {cartItems.length > 0 && (
          <CartFooter>
            <Total>
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </Total>
            <CheckoutButton onClick={handleCheckout}>
              Continuar com a entrega
            </CheckoutButton>
          </CartFooter>
        )}
      </CartSidebar>
    </>
  )
}

export default Cart

