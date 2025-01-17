import styled from 'styled-components'

interface BookCardProps {
  title: string
  author: string
  pages: number
  read: boolean
}

export function BookCard(props: BookCardProps) {
  return (
    <CardContainer>
      <Heading>{props.title}</Heading>
      <Heading>{props.author}</Heading>
      <Heading>{props.pages}</Heading>
      {props.read ? <Button>Lido</Button> : <Button>Não Lido</Button>}
      <Button>Remover</Button>
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

const Button = styled.button`
  border: 0;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.7em;
  font-size: 1.3em;
  font-weight: 600;
  outline: none;
  transition: 150ms linear;

  // TODO: Adicionar lógica para mudar a cor do botão condicionalmente
  /* background-color: #53d769;

  &:hover {
    background-color: #46c263;
  }

  background-color: #478ecc;

  &:hover {
    background-color: #3e80b9;
  }

  background-color: #f0eef1;

  &:hover {
    background-color: #fc3d39;
  } */
`
