import { Header } from '@/components/Header'
import styled from 'styled-components'

export default function Index() {
  return (
    <>
      <Header />
      <Button>+ Adicionar Livro</Button>
    </>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  margin: 1.5em 0;
  font-size: 1.4em;
  font-weight: 600;
  padding: 0.7em 1em;
  border-radius: 0.7em;
  transition: 150ms linear;
  outline: none;

  &:hover {
    background-color: var(--dark-gray);
  }
`
