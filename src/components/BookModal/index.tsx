import { Dialog } from '@mui/material'

interface ModalProps {
  open: boolean
}

export function BookModal(props: ModalProps) {
  return (
    <Dialog open={props.open}>
      <h1>Teste</h1>
    </Dialog>
  )
}
