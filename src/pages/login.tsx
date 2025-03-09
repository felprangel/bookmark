import { Header } from '@/components/Header'
import styled from 'styled-components'

export default function Login() {
  return (
    <>
      <Header title="Login" />
      <StyledForm onSubmit={login}>
        <h1>Adicionar Livro</h1>
        <StyledInput type="email" name="email" placeholder="Email" required />
        <StyledInput type="password" name="password" placeholder="Senha" required />
        <Button>Pronto!</Button>
      </StyledForm>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em;
`

const StyledInput = styled.input`
  border: none;
  background-color: #f0eef1;
  padding: 1.3em;
  margin: 0.5em 0;
  border-radius: 0.4em;
  width: 23em;
  font-size: 1em;
  font-weight: 700;
  outline: none;
`

const Button = styled.button`
  border: 0;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.7em;
  font-size: 1.3em;
  font-weight: 600;
  outline: none;
  transition: 150ms linear;

  &:hover {
    background-color: #d9d7da;
  }
`
