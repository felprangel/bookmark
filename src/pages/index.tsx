import { BookCard } from '@/components/BookCard'
import { Header } from '@/components/Header'
import styled from 'styled-components'

export default function Index() {
  return (
    <>
      <Header />
      <ButtonContainer>
        <Button>+ Adicionar Livro</Button>
      </ButtonContainer>
      <CardsContainer>
        <BookCard />
      </CardsContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
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

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  padding: 0em 7em 2em 7em;
  gap: 40px;
`
