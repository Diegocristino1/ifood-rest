import React from 'react'
import styled from 'styled-components'

const HeroSection = styled.section`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 40px 0;
  text-align: center;
`

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
`

const HeroTitle = styled.h2`
  font-size: 36px;
  font-weight: 900;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <HeroTitle>Viva experiências gastronômicas no conforto da sua casa</HeroTitle>
      </Container>
    </HeroSection>
  )
}

export default Hero

