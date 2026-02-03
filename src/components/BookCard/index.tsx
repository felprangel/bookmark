import styled from 'styled-components'

interface BookCardProps {
  title: string
  author: string
  pages: number
  read: boolean
  removeBook(): void
  handleRead(): void
}

export function BookCard(props: BookCardProps) {
  return (
    <CardContainer>
      <TextBlock>
        <Title>{props.title}</Title>
        <Author>{props.author}</Author>
      </TextBlock>
      <MetaRow>
        <MetaItem>{props.pages} páginas</MetaItem>
        <MetaDot>•</MetaDot>
        <MetaItem>{props.read ? 'Lido' : 'Não lido'}</MetaItem>
      </MetaRow>
      <Actions>
        {props.read ? (
          <Button onClick={props.handleRead} read>
            Marcar como não lido
          </Button>
        ) : (
          <Button onClick={props.handleRead}>Marcar como lido</Button>
        )}
        <Button onClick={props.removeBook} remove>
          Remover
        </Button>
      </Actions>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
  border-radius: var(--radius-md);
  padding: 1.8rem;
  gap: 1rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  min-height: 240px;
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--ink);
`

const Author = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: var(--muted-ink);
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted-ink);
`

const MetaItem = styled.span`
  color: var(--muted-ink);
`

const MetaDot = styled.span`
  color: var(--border);
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  margin-top: auto;
`

const Button = styled.button<{ read?: boolean; remove?: boolean }>`
  border: 1px solid ${props => (props.remove ? 'var(--border)' : 'var(--accent)')};
  padding: 0.55rem 1rem;
  width: 100%;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  outline: none;
  transition: 150ms ease;
  color: ${props => (props.remove ? 'var(--muted-ink)' : 'var(--white)')};
  background-color: ${props => (props.remove ? 'transparent' : 'var(--accent)')};

  &:hover {
    color: ${props => (props.remove ? 'var(--ink)' : 'var(--white)')};
    background-color: ${props => (props.remove ? 'var(--paper)' : 'var(--accent-strong)')};
    border-color: ${props => (props.remove ? 'var(--accent)' : 'var(--accent-strong)')};
  }
`
