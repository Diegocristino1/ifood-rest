import React, { useState } from 'react'
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
  max-width: 1024px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 24px;
`

const Form = styled.form`
  max-width: 600px;
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
  const { setDeliveryData, cartItems } = useCart()
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    cep: '',
    numero: '',
    complemento: '',
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
      <Container>
        <MainContent>
          <Title>Carrinho vazio</Title>
          <Button onClick={() => navigate('/')}>Voltar para restaurantes</Button>
        </MainContent>
      </Container>
    )
  }

  return (
    <Container>
      <MainContent>
        <Title>Entrega</Title>
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
    </Container>
  )
}

export default Delivery

