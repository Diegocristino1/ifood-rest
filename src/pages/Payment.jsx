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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: var(--primary-color);
  font-size: 14px;
`

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
`

const Payment = () => {
  const navigate = useNavigate()
  const { setPaymentData, cartItems, deliveryData, setOrderData } = useCart()
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    cvv: '',
    mes: '',
    ano: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Preparar dados no formato esperado pela API
      const checkoutData = {
        products: cartItems.map(item => ({
          id: item.id,
          price: item.preco,
        })),
        delivery: {
          receiver: deliveryData.nome,
          address: {
            description: deliveryData.endereco,
            city: deliveryData.cidade,
            zipCode: deliveryData.cep,
            number: parseInt(deliveryData.numero) || 0,
            complement: deliveryData.complemento || '',
          },
        },
        payment: {
          card: {
            name: formData.nome,
            number: formData.numero,
            code: parseInt(formData.cvv) || 0,
            expires: {
              month: parseInt(formData.mes) || 0,
              year: parseInt(formData.ano) || 0,
            },
          },
        },
      }

      // Fazer POST para a API
      const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        throw new Error('Erro ao processar o pedido')
      }

      const orderResponse = await response.json()
      
      // Salvar dados do pedido e pagamento
      setPaymentData(formData)
      setOrderData(orderResponse)
      
      // Navegar para a página de confirmação
      navigate('/confirmacao')
    } catch (err) {
      console.error('Erro ao processar checkout:', err)
      setError('Erro ao processar o pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 || !deliveryData) {
    return (
      <Container>
        <MainContent>
          <Title>Complete o pedido anterior</Title>
          <Button onClick={() => navigate('/entrega')}>Voltar para entrega</Button>
        </MainContent>
      </Container>
    )
  }

  return (
    <Container>
      <MainContent>
        <Title>Pagamento</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome no cartão</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </FormGroup>
          <FormGroup>
            <Label>Número do cartão</Label>
            <Input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              maxLength={16}
              disabled={loading}
            />
          </FormGroup>
          <Row>
            <FormGroup>
              <Label>CVV</Label>
              <Input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength={3}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Label>Mês de vencimento</Label>
              <Input
                type="text"
                name="mes"
                value={formData.mes}
                onChange={handleChange}
                required
                maxLength={2}
                placeholder="MM"
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ano de vencimento</Label>
              <Input
                type="text"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                required
                maxLength={4}
                placeholder="AAAA"
                disabled={loading}
              />
            </FormGroup>
          </Row>
          {loading && <LoadingMessage>Processando pedido...</LoadingMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar pagamento'}
          </Button>
        </Form>
      </MainContent>
    </Container>
  )
}

export default Payment

