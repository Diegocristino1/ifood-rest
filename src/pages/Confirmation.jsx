import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 24px;
  text-align: center;
`

const ConfirmationMessage = styled.div`
  background-color: var(--white);
  padding: 32px;
  border-radius: 8px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Message = styled.p`
  font-size: 16px;
  color: var(--text-color);
  line-height: 24px;
  margin-bottom: 24px;
`

const OrderInfo = styled.div`
  text-align: left;
  margin: 24px 0;
  padding: 16px;
  background-color: var(--secondary-color);
  border-radius: 8px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 16px;
    padding-top: 8px;
    border-top: 1px solid var(--primary-color);
  }
`

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 24px;

  &:hover {
    background-color: #d45555;
  }
`

const Confirmation = () => {
  const navigate = useNavigate()
  const { cartItems, deliveryData, paymentData, getTotalPrice, clearCart } = useCart()

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const handleNewOrder = () => {
    clearCart()
    navigate('/')
  }

  if (cartItems.length === 0 || !deliveryData || !paymentData) {
    return (
      <Container>
        <MainContent>
          <Title>Pedido não encontrado</Title>
          <Button onClick={() => navigate('/')}>Voltar para restaurantes</Button>
        </MainContent>
      </Container>
    )
  }

  return (
    <Container>
      <MainContent>
        <ConfirmationMessage>
          <Title>Pedido realizado com sucesso!</Title>
          <Message>
            Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
          </Message>
          <OrderInfo>
            <InfoRow>
              <span>Gênero de prato:</span>
              <span>Italiana</span>
            </InfoRow>
            <InfoRow>
              <span>Pedido:</span>
              <span>{cartItems.length} item(s)</span>
            </InfoRow>
            <InfoRow>
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </InfoRow>
          </OrderInfo>
          <Message>
            Previsão de entrega:<br />
            <strong>30 - 40 minutos</strong>
          </Message>
          <Button onClick={handleNewOrder}>Concluir</Button>
        </ConfirmationMessage>
      </MainContent>
    </Container>
  )
}

export default Confirmation

