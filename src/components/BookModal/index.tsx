import { Checkbox, Dialog } from '@mui/material'
import { useFormik } from 'formik'
import styled from 'styled-components'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export interface BookProps {
  title: string
  author: string
  pages: number
  read: boolean
}

export function BookModal(props: ModalProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      pages: 0,
      read: false
    },
    onSubmit: handleSubmit
  })

  function handleSubmit(data: BookProps) {
    console.log(data)
    window.dispatchEvent(new Event('storage'))
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <StyledForm onSubmit={formik.handleSubmit}>
        <h1>Adicionar Livro</h1>
        <StyledInput
          type="text"
          name="title"
          placeholder="Título"
          maxLength={100}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <StyledInput
          type="text"
          name="author"
          placeholder="Autor"
          maxLength={100}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />
        <StyledInput
          type="number"
          name="pages"
          placeholder="Páginas"
          min={0}
          max={10000}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pages}
        />
        <CheckboxContainer>
          <h2>Lido?</h2>
          <Checkbox name="read" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.read} />
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
  margin: 2em;
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
