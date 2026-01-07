import React, { useState } from 'react'
import styled from 'styled-components'
import ProductModal from './ProductModal'

const Card = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`

const Image = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
`

const Info = styled.div`
  padding: 8px;
`

const Name = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color);
`

const Description = styled.p`
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
`

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d45555;
  }
`

const ProductCard = ({ product, restaurant }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  return (
    <>
      <Card>
        <Image
          src={product.foto || 'https://via.placeholder.com/200x167?text=Produto'}
          alt={product.nome}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x167?text=Produto'
          }}
        />
        <Info>
          <Name>{product.nome}</Name>
          <Description>{product.descricao || ''}</Description>
          <Footer>
            <Price>{formatPrice(product.preco || 0)}</Price>
            <Button onClick={() => setModalOpen(true)}>Adicionar ao carrinho</Button>
          </Footer>
        </Info>
      </Card>
      {modalOpen && (
        <ProductModal
          product={product}
          restaurant={restaurant}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default ProductCard

