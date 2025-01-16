import styled from 'styled-components'

export function BookCard() {
  return (
    <CardContainer>
      <Heading>Título</Heading>
      <Heading>Autor</Heading>
      <Heading>Páginas</Heading>
      <ReadButton>Lido</ReadButton>
      <DeleteButton>Remover</DeleteButton>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-radius: 0.8em;
  padding: 1.5em;
  gap: 1em;
  box-shadow: 10px 10px 10px -3px rgba(0, 0, 0, 0.1);
`

const Heading = styled.h2`
  font-size: 1.3em;
  font-weight: 600;
`

const ReadButton = styled.button``

const DeleteButton = styled.button``
