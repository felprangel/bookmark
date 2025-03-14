import { api } from '@/services/api'
import { Checkbox, Dialog } from '@mui/material'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export interface BookProps {
  id: number
  title: string
  author: string
  pages: number
  read: boolean
}

type BookForm = Omit<BookProps, 'id'>

export function BookModal(props: ModalProps) {
  const bookSchema = z.object({
    title: z.string({ required_error: 'O título é obrigatório' }),
    author: z.string({ required_error: 'O autor é obrigatório' }),
    pages: z
      .number()
      .min(0, 'O número de paǵinas deve ser maior do que 0')
      .max(10000, 'O número de páginas deve ser maior do que 10000'),
    read: z.boolean()
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      pages: 0,
      read: false
    },
    validationSchema: toFormikValidationSchema(bookSchema),
    onSubmit: handleSubmit,
    validateOnBlur: true
  })

  async function handleSubmit(data: BookForm) {
    await api.post('/books', data)

    window.dispatchEvent(new Event('storage'))
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <StyledForm onSubmit={formik.handleSubmit}>
        <h1>Adicionar Livro</h1>
        <InputContainer>
          <StyledInput
            type="text"
            name="title"
            placeholder="Título"
            maxLength={100}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && <ErrorMessage>{formik.errors.title}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <StyledInput
            type="text"
            name="author"
            placeholder="Autor"
            maxLength={100}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
          />
          {formik.touched.author && formik.errors.author && <ErrorMessage>{formik.errors.author}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <StyledInput
            type="number"
            name="pages"
            placeholder="Páginas"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pages}
          />
          {formik.touched.pages && formik.errors.pages && <ErrorMessage>{formik.errors.pages}</ErrorMessage>}
        </InputContainer>
        <CheckboxContainer>
          <h2>Lido?</h2>
          <Checkbox name="read" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.read} />
        </CheckboxContainer>
        <Button type="submit">Pronto!</Button>
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

const InputContainer = styled.div`
  width: 100%;
  max-width: 23em;
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
`

const StyledInput = styled.input`
  border: none;
  background-color: #f0eef1;
  padding: 1.3em;
  border-radius: 0.4em;
  width: 100%;
  font-size: 1em;
  font-weight: 700;
  outline: none;
`

const ErrorMessage = styled.span`
  color: #ff3333;
  font-size: 0.8em;
  margin-top: 0.3em;
  align-self: flex-start;
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
