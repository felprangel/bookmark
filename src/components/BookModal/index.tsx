import { api } from '@/services/api'
import { Checkbox, Dialog } from '@mui/material'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
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
      .number({ required_error: 'O número de páginas é obrigatório' })
      .min(1, 'O número de paǵinas deve ser maior do que 0')
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
    try {
      await api.post('/books', data)

      props.onClose()
      toast.success('Book added!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-soft)'
        }
      }}
    >
      <StyledForm onSubmit={formik.handleSubmit}>
        <FormHeader>
          <Title>Adicionar livro</Title>
          <Subtitle>Registre mais uma leitura na coleção.</Subtitle>
        </FormHeader>
        <InputContainer>
          <Label htmlFor="title">Título</Label>
          <StyledInput
            id="title"
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
          <Label htmlFor="author">Autor</Label>
          <StyledInput
            id="author"
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
          <Label htmlFor="pages">Páginas</Label>
          <StyledInput
            id="pages"
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
          <CheckboxLabel>Lido?</CheckboxLabel>
          <Checkbox
            name="read"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.read}
            sx={{
              color: 'var(--accent)',
              '&.Mui-checked': {
                color: 'var(--accent)'
              }
            }}
          />
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
  margin: 2.2rem;
  gap: 1.1rem;
`

const InputContainer = styled.div`
  width: 100%;
  max-width: 23em;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.3rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  color: var(--ink);
`

const Subtitle = styled.p`
  color: var(--muted-ink);
  font-size: 0.95rem;
`

const Label = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-ink);
`

const StyledInput = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 0.7rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
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
  gap: 0.4rem;
`

const CheckboxLabel = styled.span`
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted-ink);
`

const Button = styled.button`
  border: 1px solid var(--accent);
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  outline: none;
  transition: 150ms ease;
  background-color: var(--accent);
  color: var(--white);

  &:hover {
    background-color: var(--accent-strong);
  }
`
