import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MenuBlock } from './components/MenuBlock'

interface HeaderProps {
  title?: string
}

export function Header(props: HeaderProps) {
  const Route = useRouter()
  return (
    <StyledHeader>
      <Heading onClick={() => Route.push('/')}>{props.title ?? 'Bookmark'}</Heading>
      <MenuBlock />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4em;
  min-height: 6rem;
  box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
`

const Heading = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  cursor: pointer;
`
