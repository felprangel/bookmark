import { Dialog } from '@mui/material'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export function BookModal(props: ModalProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <h1>Teste</h1>
    </Dialog>
  )
}
