import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'
import CheckoutHeader from '../components/CheckoutHeader'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.4);
`

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 24px;
`

const Sidebar = styled.aside`
  width: 360px;
  background-color: var(--primary-color);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: none;
  }
`

const SidebarField = styled.div`
  background-color: var(--white);
  min-height: 40px;
  border-radius: 8px;
  width: 100%;
`

const Form = styled.form`
  max-width: 600px;
  background-color: var(--white);
  padding: 32px;
  border-radius: 8px;
  margin: 0 auto;
`

const FormGroup = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  font-size: 14px;
  background-color: var(--white);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(230, 103, 103, 0.2);
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

  &:hover {
    background-color: #d45555;
  }
`

const Delivery = () => {
  const navigate = useNavigate()
  const { setDeliveryData, cartItems, deliveryData } = useCart()
  const [formData, setFormData] = useState({
    nome: deliveryData?.nome || '',
    endereco: deliveryData?.endereco || '',
    cidade: deliveryData?.cidade || '',
    cep: deliveryData?.cep || '',
    numero: deliveryData?.numero || '',
    complemento: deliveryData?.complemento || '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDeliveryData(formData)
    navigate('/pagamento')
  }

  if (cartItems.length === 0) {
    return (
      <>
        <CheckoutHeader />
        <Container>
          <MainContent>
            <Form>
              <Title>Carrinho vazio</Title>
              <Button onClick={() => navigate('/')}>Voltar para restaurantes</Button>
            </Form>
          </MainContent>
        </Container>
      </>
    )
  }

  return (
    <>
      <CheckoutHeader />
      <Container>
        <MainContent>
          <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Quem irá receber</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Endereço</Label>
            <Input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidade</Label>
            <Input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Row>
            <FormGroup>
              <Label>CEP</Label>
              <Input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Número</Label>
              <Input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Row>
          <FormGroup>
            <Label>Complemento (opcional)</Label>
            <Input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </FormGroup>
            <Button type="submit">Continuar com o pagamento</Button>
          </Form>
        </MainContent>
        <Sidebar>
          <SidebarField style={{ height: formData.nome ? 'auto' : '40px', padding: formData.nome ? '8px' : '0' }}>
            {formData.nome && <div style={{ color: 'var(--primary-color)', fontSize: '14px', fontWeight: '700' }}>Quem irá receber: {formData.nome}</div>}
          </SidebarField>
          <SidebarField style={{ height: formData.endereco ? 'auto' : '40px', padding: formData.endereco ? '8px' : '0' }}>
            {formData.endereco && <div style={{ color: 'var(--primary-color)', fontSize: '14px' }}>{formData.endereco}</div>}
          </SidebarField>
          <SidebarField style={{ height: formData.cidade || formData.cep || formData.numero ? 'auto' : '40px', padding: formData.cidade || formData.cep || formData.numero ? '8px' : '0' }}>
            {(formData.cidade || formData.cep || formData.numero) && (
              <div style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
                {formData.cidade && `${formData.cidade} - `}
                {formData.cep && `CEP: ${formData.cep} - `}
                {formData.numero && `Nº ${formData.numero}`}
              </div>
            )}
          </SidebarField>
          <SidebarField style={{ height: formData.complemento ? 'auto' : '40px', padding: formData.complemento ? '8px' : '0' }}>
            {formData.complemento && <div style={{ color: 'var(--primary-color)', fontSize: '14px' }}>{formData.complemento}</div>}
          </SidebarField>
        </Sidebar>
      </Container>
    </>
  )
}

export default Delivery

