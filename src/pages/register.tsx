import { Header } from '@/components/Header'
import { RegisterData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Register() {
  const Auth = useAuth()

  const registerSchema = z.object({
    name: z.string({ required_error: 'O nome é obrigatório' }),
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' }),
    password_confirmation: z.string({ required_error: 'A confirmação de senha é obrigatória' })
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: handleSubmit,
    validateOnBlur: true
  })

  async function handleSubmit(data: RegisterData) {
    Auth.register(data)
  }

  return (
    <>
      <Header title="Registro" />
      <StyledForm onSubmit={formik.handleSubmit}>
        <InputContainer>
          <StyledInput
            type="text"
            name="name"
            placeholder="Nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <ErrorMessage>{formik.errors.name}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <StyledInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <ErrorMessage>{formik.errors.email}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <StyledInput
            type="password"
            name="password"
            placeholder="Senha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <ErrorMessage>{formik.errors.password}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <StyledInput
            type="password"
            name="password_confirmation"
            placeholder="Confirme sua Senha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation && (
            <ErrorMessage>{formik.errors.password_confirmation}</ErrorMessage>
          )}
        </InputContainer>
        <Button type="submit">Pronto!</Button>
        <Link href={'/login'}>Já tem uma conta? Faça login</Link>
      </StyledForm>
    </>
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
  background-color: var(--white);
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

const Button = styled.button`
  margin: 0.5rem 0;
  border: 0;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.7em;
  font-size: 1.3em;
  font-weight: 600;
  outline: none;
  transition: 150ms linear;
  max-width: 30%;
  background-color: #d9d7da;

  &:hover {
    background-color: var(--gray);
  }
`
