import { Checkbox, Dialog } from '@mui/material'
import styled from 'styled-components'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export function BookModal(props: ModalProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <StyledForm>
        <h1>Adicionar Livro</h1>
        <StyledInput type="text" name="title" placeholder="Título" maxLength={100} required />
        <StyledInput type="text" name="author" placeholder="Autor" maxLength={100} required />
        <StyledInput type="number" name="pages" placeholder="Páginas" min={0} max={10000} required />
        <CheckboxContainer>
          <h2>Lido?</h2>
          <Checkbox name="status" />
        </CheckboxContainer>
        <Button>Pronto!</Button>
      </StyledForm>
    </Dialog>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
