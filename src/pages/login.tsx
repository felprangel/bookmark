import { Header } from '@/components/Header'
import { LoginData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Login() {
  const Auth = useAuth()

  const loginSchema = z.object({
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' })
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: handleSubmit,
    validateOnBlur: true
  })

  async function handleSubmit(data: LoginData) {
    Auth.login(data)
  }

  return (
    <>
      <Header title="Login" />
      <StyledForm onSubmit={formik.handleSubmit}>
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

        <Button type="submit">Pronto!</Button>
        <Link href={'/register'}>Não tem uma conta? Registre-se</Link>
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
