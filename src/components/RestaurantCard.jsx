import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`

const Image = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

const Info = styled.div`
  padding: 8px;
`

const Name = styled.h3`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 8px;
  color: var(--primary-color);
`

const Description = styled.p`
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 22px;
`

const Rating = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
`

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/restaurante/${restaurant.id}`)
  }

  return (
    <Card onClick={handleClick}>
      <Image
        src={restaurant.capa || 'https://via.placeholder.com/300x217?text=Restaurante'}
        alt={restaurant.titulo}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x217?text=Restaurante'
        }}
      />
      <Info>
        <Name>{restaurant.titulo}</Name>
        <Description>{restaurant.descricao || ''}</Description>
        <Rating>{restaurant.avaliacao || 'N/A'}</Rating>
      </Info>
    </Card>
  )
}

export default RestaurantCard

