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
  min-height: 6rem;
  box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
`

const Heading = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
`
