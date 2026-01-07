import React from 'react'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const ModalContent = styled.div`
  background-color: var(--white);
  padding: 32px;
  border-radius: 8px;
  max-width: 1024px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const CloseButton = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`

const ModalBody = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  flex-shrink: 0;
`

const ProductImage = styled.img`
  width: 100%;
  max-width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
`

const ContentContainer = styled.div`
  flex: 1;
  min-width: 250px;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 16px;
`

const Description = styled.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 22px;
  margin-bottom: 16px;
`

const Details = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DetailLabel = styled.span`
  font-size: 14px;
  color: var(--text-color);
`

const DetailValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
`

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  border: none;

  &.primary {
    background-color: var(--primary-color);
    color: var(--white);

    &:hover {
      background-color: #d45555;
    }
  }

  &.secondary {
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);

    &:hover {
      background-color: var(--secondary-color);
    }
  }
`

const ProductModal = ({ product, restaurant, onClose }) => {
  const { addToCart } = useCart()

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const handleAddToCart = () => {
    addToCart(product, restaurant)
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalBody>
          <ImageContainer>
            <ProductImage
              src={product.foto || 'https://via.placeholder.com/280x280?text=Produto'}
              alt={product.nome}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/280x280?text=Produto'
              }}
            />
          </ImageContainer>
          <ContentContainer>
            <Title>{product.nome}</Title>
            <Description>{product.descricao || 'Sem descrição disponível.'}</Description>
            <Details>
              <Detail>
                <DetailLabel>Restaurante</DetailLabel>
                <DetailValue>{restaurant.titulo}</DetailValue>
              </Detail>
              <Detail>
                <DetailLabel>Preço</DetailLabel>
                <DetailValue>{formatPrice(product.preco || 0)}</DetailValue>
              </Detail>
              {product.porcao && (
                <Detail>
                  <DetailLabel>Porção</DetailLabel>
                  <DetailValue>{product.porcao}</DetailValue>
                </Detail>
              )}
            </Details>
            <Actions>
              <Button className="primary" onClick={handleAddToCart}>
                Adicionar ao carrinho
              </Button>
              <Button className="secondary" onClick={onClose}>
                Continuar comprando
              </Button>
            </Actions>
          </ContentContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ProductModal

