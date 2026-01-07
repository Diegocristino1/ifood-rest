import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0;
`

const Banner = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const RestaurantInfo = styled.div`
  padding: 32px 16px;
  background-color: var(--white);
  margin-top: -80px;
  position: relative;
  z-index: 1;
  border-radius: 8px 8px 0 0;
  margin-left: 16px;
  margin-right: 16px;
`

const RestaurantName = styled.h1`
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 8px;
`

const RestaurantDescription = styled.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 22px;
  margin-bottom: 8px;
`

const ProductsSection = styled.div`
  padding: 32px 16px;
  background-color: var(--bg-color);
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--text-color);
`

const Error = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--primary-color);
`

const BackButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d45555;
  }
`

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurante, setRestaurante] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
        
        if (!response.ok) {
          throw new Error('Erro ao carregar restaurante')
        }
        
        const data = await response.json()
        const restauranteEncontrado = data.find(r => r.id === parseInt(id))
        
        if (!restauranteEncontrado) {
          throw new Error('Restaurante não encontrado')
        }
        
        setRestaurante(restauranteEncontrado)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Erro ao carregar restaurante:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurante()
  }, [id])

  if (loading) {
    return (
      <Container>
        <Loading>Carregando restaurante...</Loading>
      </Container>
    )
  }

  if (error || !restaurante) {
    return (
      <Container>
        <Error>{error || 'Restaurante não encontrado'}</Error>
      </Container>
    )
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>← Voltar</BackButton>
      <Banner>
        <img
          src={restaurante.capa || 'https://via.placeholder.com/1024x280?text=Restaurante'}
          alt={restaurante.titulo}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1024x280?text=Restaurante'
          }}
        />
      </Banner>
      <RestaurantInfo>
        <RestaurantName>{restaurante.titulo}</RestaurantName>
        <RestaurantDescription>{restaurante.descricao || ''}</RestaurantDescription>
      </RestaurantInfo>
      <ProductsSection>
        <ProductsGrid>
          {restaurante.cardapio && restaurante.cardapio.length > 0 ? (
            restaurante.cardapio.map(produto => (
              <ProductCard
                key={produto.id}
                product={produto}
                restaurant={restaurante}
              />
            ))
          ) : (
            <Error>Nenhum produto disponível</Error>
          )}
        </ProductsGrid>
      </ProductsSection>
    </Container>
  )
}

export default RestaurantDetail

