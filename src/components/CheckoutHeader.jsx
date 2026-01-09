import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 24px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
`

const NavLink = styled.span`
  color: ${props => props.active ? 'var(--white)' : 'rgba(255, 255, 255, 0.6)'};
  text-decoration: none;
  font-size: 18px;
  font-weight: ${props => props.active ? '700' : '400'};
  transition: opacity 0.3s;
  cursor: ${props => props.active ? 'default' : 'pointer'};

  &:hover {
    opacity: 0.8;
  }
`

const CheckoutHeader = () => {
  const location = useLocation()

  const steps = [
    { path: '/entrega', label: 'Entrega' },
    { path: '/pagamento', label: 'Pagamento' },
    { path: '/confirmacao', label: 'Confirmação' },
  ]

  return (
    <HeaderContainer>
      <Container>
        <Nav>
          {steps.map((step) => (
            <NavLink key={step.path} active={location.pathname === step.path}>
              {step.label}
            </NavLink>
          ))}
        </Nav>
      </Container>
    </HeaderContainer>
  )
}

export default CheckoutHeader
