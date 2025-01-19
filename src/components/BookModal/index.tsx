import { Dialog } from '@mui/material'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export function BookModal(props: ModalProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form>
        <h1>Adicionar Livro</h1>
        <input type="text" name="book_title" placeholder="Título" maxLength={100} required />
        <input type="text" name="book_author" placeholder="Autor" maxLength={100} required />
        <input type="number" name="book_pages" placeholder="Páginas" min={0} max={10000} required />
        <div>
          <h2>Lido?</h2>
          <input type="checkbox" name="book_status" />
        </div>
        <button id="done">Pronto!</button>
      </form>
    </Dialog>
  )
}
