import { Modal } from '@mui/material'

interface ModalProps {
  open: boolean
}

export function BookModal(props: ModalProps) {
  return (
    <Modal open={props.open}>
      <h1>Teste</h1>
    </Modal>
  )
}
