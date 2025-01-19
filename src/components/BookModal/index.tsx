import { Dialog } from '@mui/material'
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
        <input type="text" name="title" placeholder="Título" maxLength={100} required />
        <input type="text" name="author" placeholder="Autor" maxLength={100} required />
        <input type="number" name="pages" placeholder="Páginas" min={0} max={10000} required />
        <div>
          <h2>Lido?</h2>
          <input type="checkbox" name="status" />
        </div>
        <button>Pronto!</button>
      </StyledForm>
    </Dialog>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
