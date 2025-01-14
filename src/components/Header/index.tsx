import styled from 'styled-components'

export function Header() {
  return (
    <StyledHeader>
      <Heading>Bookmark</Heading>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7em;
`

const Heading = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
`
