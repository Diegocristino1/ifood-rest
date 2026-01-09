import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 24px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: var(--white);
  text-decoration: none;
`

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`

const NavLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`

const CartButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.3s;
  position: relative;
  padding: 8px 16px;

  &:hover {
    opacity: 0.8;
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`

const Header = ({ onCartClick }) => {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo to="/">eFood</Logo>
          <Nav>
            <NavLink to="/">Restaurantes</NavLink>
            <NavLink to="/">Sobre</NavLink>
            <CartButton onClick={onCartClick}>
              Carrinho
              {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
            </CartButton>
          </Nav>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  )
}

export default Header

