import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Hero from '../components/Hero'
import RestaurantCard from '../components/RestaurantCard'

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 56px 16px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 32px;
  color: var(--primary-color);
`

const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const RightColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-content: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--text-color);
  grid-column: 1 / -1;
`

const Error = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--primary-color);
  grid-column: 1 / -1;
`

const Home = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
        
        if (!response.ok) {
          throw new Error('Erro ao carregar restaurantes')
        }
        
        const data = await response.json()
        setRestaurantes(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Erro ao carregar restaurantes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurantes()
  }, [])

  // Dividir restaurantes: 3 primeiros à esquerda, resto à direita
  const leftRestaurants = restaurantes.slice(0, 3)
  const rightRestaurants = restaurantes.slice(3, 7)

  return (
    <>
      <Hero />
      <Container>
        <SectionTitle>Restaurantes</SectionTitle>
        {loading && <Loading>Carregando restaurantes...</Loading>}
        {error && <Error>Erro ao carregar restaurantes. Tente novamente mais tarde.</Error>}
        {!loading && !error && restaurantes.length === 0 && (
          <Error>Nenhum restaurante encontrado.</Error>
        )}
        {!loading && !error && restaurantes.length > 0 && (
          <RestaurantsGrid>
            <LeftColumn>
              {leftRestaurants.map(restaurante => (
                <RestaurantCard key={restaurante.id} restaurant={restaurante} />
              ))}
            </LeftColumn>
            {rightRestaurants.length > 0 && (
              <RightColumn>
                {rightRestaurants.map(restaurante => (
                  <RestaurantCard key={restaurante.id} restaurant={restaurante} />
                ))}
              </RightColumn>
            )}
          </RestaurantsGrid>
        )}
      </Container>
    </>
  )
}

export default Home

