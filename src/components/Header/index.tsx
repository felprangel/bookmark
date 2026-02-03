import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MenuBlock } from './components/MenuBlock'

interface HeaderProps {
  title?: string
  showRightSide?: boolean
}

export function Header(props: HeaderProps) {
  const Route = useRouter()

  return (
    <StyledHeader>
      <Heading onClick={() => Route.push('/')}>{props.title ?? 'Bookmark'}</Heading>
      {props.showRightSide && <MenuBlock />}
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.5rem;
  min-height: 4.75rem;
  border-bottom: 1px solid var(--border);
  box-shadow: none;

  @media (max-width: 720px) {
    padding: 0 1.5rem;
  }
`

const Heading = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 720px) {
    font-size: 1.9rem;
  }
`
